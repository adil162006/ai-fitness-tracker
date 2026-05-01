import supabase from "../lib/supabase";
import AsyncHandler from "../lib/AsyncHandler";
import type { Request, Response } from "express";
import type { User } from "../types";
import { generateWeeklySummary } from "../services/weeklySummary.service";

function getMondayOfCurrentWeek(): string {
  const now = new Date();
  const day = now.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday);
  return monday.toISOString().split("T")[0]!;
}

function getSundayOfCurrentWeek(mondayStr: string): string {
  const monday = new Date(mondayStr);
  monday.setDate(monday.getDate() + 6);
  return monday.toISOString().split("T")[0]!;
}

export const getWeeklySummary = AsyncHandler(
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

    // ── Week boundaries — default to current week ─────────────────────
    // Allow ?week_start=2025-01-06 to fetch any past week
    const weekStart = (req.query.week_start as string) || getMondayOfCurrentWeek();
    const weekEnd = getSundayOfCurrentWeek(weekStart);

    // ── Return cached summary if it exists ────────────────────────────
    const { data: existing } = await supabase
      .from("weekly_summaries")
      .select("*")
      .eq("user_id", user.id)
      .eq("week_start", weekStart)
      .single();

    if (existing) {
      // Fetch this week's logs to return alongside the cached summary
      const { data: weekLogs } = await supabase
        .from("workout_logs")
        .select("*")
        .eq("user_id", user.id)
        .gte("date", weekStart)
        .lte("date", weekEnd)
        .order("date", { ascending: true });

      return res.status(200).json({
        success: true,
        data: {
          summary: existing,
          logs: weekLogs ?? [],
        },
      });
    }

    // ── Fetch this week's workout logs ────────────────────────────────
    const { data: weekLogs, error: logsError } = await supabase
      .from("workout_logs")
      .select("*")
      .eq("user_id", user.id)
      .gte("date", weekStart)
      .lte("date", weekEnd)
      .order("date", { ascending: true });

    if (logsError) {
      return res.status(500).json({ success: false, message: logsError.message });
    }

    if (!weekLogs || weekLogs.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          summary: null,
          logs: [],
          message: "No workouts logged this week yet.",
        },
      });
    }

    // ── Generate summary via Gemini ───────────────────────────────────
    const generated = await generateWeeklySummary(
      profile as User,
      weekStart,
      weekEnd,
      weekLogs,
      profile.weekly_availability
    );

    // ── Save to weekly_summaries ──────────────────────────────────────
    const { data: saved, error: insertError } = await supabase
      .from("weekly_summaries")
      .insert({
        user_id: user.id,
        week_start: weekStart,
        week_end: weekEnd,
        summary_text: generated.summary_text,
        consistency_score: generated.consistency_score,
      })
      .select()
      .single();

    if (insertError) {
      return res.status(500).json({ success: false, message: insertError.message });
    }

    // Return saved summary + logs + AI analysis sections
    return res.status(201).json({
      success: true,
      data: {
        summary: saved,
        // win/gap/next_week_focus are not stored in DB (no column for them)
        // they are returned fresh alongside the summary for the frontend to display
        analysis: {
          win: generated.win,
          gap: generated.gap,
          next_week_focus: generated.next_week_focus,
        },
        logs: weekLogs,
      },
    });
  }
);

// ── All past summaries list (for history dropdown) ────────────────────────────
export const getAllWeeklySummaries = AsyncHandler(
  async (req: Request, res: Response) => {
    const token =
      req.cookies["sb-access-token"] ||
      req.headers.authorization?.split(" ")[1];

    const { data, error: userError } = await supabase.auth.getUser(token);
    if (userError || !data.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { data: summaries, error } = await supabase
      .from("weekly_summaries")
      .select("id, week_start, week_end, consistency_score")
      .eq("user_id", data.user.id)
      .order("week_start", { ascending: false });

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({ success: true, data: summaries });
  }
);