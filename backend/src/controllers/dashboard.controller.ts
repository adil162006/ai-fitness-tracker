import supabase from "../lib/supabase";
import AsyncHandler from "../lib/AsyncHandler";
import type { Request, Response } from "express";
import type { User } from "../types";
import { generateCoachTip } from "../services/dashboard.service";

export const getDashboard = AsyncHandler(
  async (req: Request, res: Response) => {
    // ── Auth ──────────────────────────────────────────────────────────
    const token =
      req.cookies["sb-access-token"] ||
      req.headers.authorization?.split(" ")[1];

    const { data, error: userError } = await supabase.auth.getUser(token);
    if (userError || !data.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const user = data.user;

    // ── Profile ───────────────────────────────────────────────────────
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    const today = new Date().toISOString().split("T")[0]!;

    // ── Week boundaries (Monday → Sunday) ─────────────────────────────
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(now);
    monday.setDate(now.getDate() + diffToMonday);
    monday.setHours(0, 0, 0, 0);
    const weekStart = monday.toISOString().split("T")[0]!;

    // ── Parallel fetches ──────────────────────────────────────────────
    const [
      { data: todayPlan },
      { data: weekLogs },
      { data: latestInsights },
      { data: latestMeals },
    ] = await Promise.all([
      // Today's workout plan row
      supabase
        .from("workout_plans")
        .select("*")
        .eq("user_id", user.id)
        .eq("date", today)
        .single(),

      // This week's workout logs
      supabase
        .from("workout_logs")
        .select("date, duration_minutes, intensity, soreness_reported, exercises")
        .eq("user_id", user.id)
        .gte("date", weekStart)
        .order("date", { ascending: false }),

      // Latest AI insight for today (for coach tip)
      supabase
        .from("ai_insights")
        .select("content, type")
        .eq("user_id", user.id)
        .eq("generated_for_date", today)
        .order("created_at", { ascending: false })
        .limit(1),

      // Latest meal for nutrition section
      supabase
        .from("meals")
        .select("meal_text, ai_feedback, logged_at")
        .eq("user_id", user.id)
        .order("logged_at", { ascending: false })
        .limit(1),
    ]);

    // ── Weekly stats derived from logs ────────────────────────────────
    const logs = weekLogs ?? [];

    const weeklyDurationMinutes = logs.reduce(
      (sum, log) => sum + (log.duration_minutes ?? 0),
      0
    );
    const weeklyDurationHours =
      Math.round((weeklyDurationMinutes / 60) * 10) / 10;

    const weeklyCalories = weeklyDurationMinutes * 8; // rough kcal estimate

    const totalVolumeKg = logs.reduce((sum, log) => {
      const exercises: any[] = log.exercises ?? [];
      return (
        sum +
        exercises.reduce((eSum: number, ex: any) => {
          const weight = parseFloat(ex.weight) || 0;
          const reps =
            typeof ex.reps === "number"
              ? ex.reps
              : parseInt(String(ex.reps)) || 0;
          return eSum + weight * reps * (ex.sets ?? 0);
        }, 0)
      );
    }, 0);

    // ── Weekly activity map (Mon–Sun) ─────────────────────────────────
    const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];
    const weeklyActivityMap = dayLabels.map((label, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      const dateStr = date.toISOString().split("T")[0]!;
      const log = logs.find((l) => l.date === dateStr);
      return {
        day: label,
        hasWorkout: !!log,
        duration_minutes: log?.duration_minutes ?? 0,
      };
    });

    // ── AI coach tip — use cached insight or generate a quick one ─────
    let coachTip = latestInsights?.[0]?.content ?? null;

    if (!coachTip) {
      coachTip = await generateCoachTip(
        profile as User,
        logs.slice(0, 3).map((l) => ({
          duration_minutes: l.duration_minutes,
          intensity: l.intensity,
          soreness_reported: l.soreness_reported,
        }))
      );
    }

    // ── Protein from latest meal feedback ─────────────────────────────
    const latestMeal = latestMeals?.[0] ?? null;
    const proteinMatch = latestMeal?.ai_feedback?.match(/~(\d+)g protein/);
    const proteinCurrent = proteinMatch ? parseInt(proteinMatch[1]) : 0;
    const proteinTarget = Math.round(profile.weight_kg * 2.2);

    // ── Assemble response ─────────────────────────────────────────────
    return res.status(200).json({
      success: true,
      data: {
        // Today's plan — null if rest day or not generated yet
        todayPlan: todayPlan ?? null,

        // Weekly stats
        weeklyStats: {
          workoutCount: logs.length,
          durationHours: weeklyDurationHours,
          calories: weeklyCalories,
          volumeKg: Math.round(totalVolumeKg),
          volumeTons: parseFloat((totalVolumeKg / 1000).toFixed(1)),
        },

        // Mon–Sun activity map
        weeklyActivityMap,

        // AI coach tip
        coachTip,

        // Nutrition
        nutrition: {
          proteinCurrent,
          proteinTarget,
          latestMeal: latestMeal
            ? {
                meal_text: latestMeal.meal_text,
                ai_feedback: latestMeal.ai_feedback,
                logged_at: latestMeal.logged_at,
              }
            : null,
        },

        // User profile for display
        user: {
          name: profile.name,
          weight_kg: profile.weight_kg,
          fitness_goal: profile.fitness_goal,
          experience_level: profile.experience_level,
        },
      },
    });
  }
);