import { generateWorkOutPlan } from "../services/workoutPlan.service";
import supabase from "../lib/supabase";
import AsyncHandler from "../lib/AsyncHandler";
import type { Request, Response } from "express";
import type { User } from "../types";

const DAYS_OF_WEEK = [
  "Monday", "Tuesday", "Wednesday", "Thursday",
  "Friday", "Saturday", "Sunday",
];

function getMondayOfCurrentWeek(): string {
  const now = new Date();
  const day = now.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday);
  return monday.toISOString().split("T")[0]!; // ✅ non-null assertion
}

function getTodayDayName(): string {
  const day = new Date().getDay();
  const idx = day === 0 ? 6 : day - 1;
  return DAYS_OF_WEEK[idx]!; // ✅ non-null assertion — idx is always 0-6
}

export const getTodaysPlan = AsyncHandler(
  async (req: Request, res: Response) => {
    // ── Auth ─────────────────────────────────────────────────────────
    const token =
      (req.cookies["sb-access-token"] as string | undefined) ||
      req.headers.authorization?.split(" ")[1] ||
      "";

    const { data, error: userError } = await supabase.auth.getUser(token);
    if (userError || !data.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = data.user;

    // ── Profile ───────────────────────────────────────────────────────
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // ── Week resolution ───────────────────────────────────────────────
    const weekStart = getMondayOfCurrentWeek();
    const todayName = getTodayDayName();
    const today = new Date().toISOString().split("T")[0]!; // ✅ non-null assertion

    // Check whether this week's plan already exists
    const { data: existingWeek } = await supabase
      .from("workout_plans")
      .select("*")
      .eq("user_id", user.id)
      .eq("week_start", weekStart);

    if (existingWeek && existingWeek.length > 0) {
      const todayRow = existingWeek.find((r) => r.day_of_week === todayName);

      if (!todayRow || todayRow.is_rest_day) {
        return res.json({
          is_rest_day: true,
          day_of_week: todayName,
          message: "No workout today — it's a rest day. Recovery is part of the plan!",
        });
      }

      return res.json(todayRow);
    }

    // ── Generate new weekly plan ──────────────────────────────────────
    const result = await generateWorkOutPlan(profile as User);

    const rows = result.days.map((day) => ({
      user_id: user.id,
      date: getDateForDayOfWeek(weekStart, day.day_of_week),
      week_start: weekStart,
      day_of_week: day.day_of_week,
      exercises: day.exercises,
      difficulty: day.difficulty,
      explanation: day.explanation,
      is_rest_day: day.is_rest_day,
      source: result.source,
    }));

    const { error: insertError } = await supabase
      .from("workout_plans")
      .upsert(rows, { onConflict: "user_id,date" });

    if (insertError) {
      return res.status(500).json({ error: insertError.message });
    }

    const todayPlan = result.days.find((d) => d.day_of_week === todayName);

    if (!todayPlan || todayPlan.is_rest_day) {
      return res.json({
        is_rest_day: true,
        day_of_week: todayName,
        message: "No workout today — it's a rest day. Recovery is part of the plan!",
      });
    }

    const { data: savedToday } = await supabase
      .from("workout_plans")
      .select("*")
      .eq("user_id", user.id)
      .eq("date", today)
      .single();

    return res.json(savedToday ?? todayPlan);
  }
);

function getDateForDayOfWeek(weekStart: string, dayName: string): string {
  const DAYS_OF_WEEK = [
    "Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday", "Sunday",
  ];
  const idx = DAYS_OF_WEEK.indexOf(dayName);
  const monday = new Date(weekStart);
  monday.setDate(monday.getDate() + idx);
  return monday.toISOString().split("T")[0]!; // ✅ non-null assertion
}