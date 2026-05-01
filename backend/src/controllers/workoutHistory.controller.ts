import supabase from "../lib/supabase";
import AsyncHandler from "../lib/AsyncHandler";
import type { Request, Response } from "express";

export const getWorkoutHistory = AsyncHandler(
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

    // ── Pagination params ─────────────────────────────────────────────
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
    const offset = (page - 1) * limit;

    // ── Optional intensity filter ─────────────────────────────────────
    const intensity = req.query.intensity as string | undefined;

    // ── Build query ───────────────────────────────────────────────────
    let query = supabase
      .from("workout_logs")
      .select("*", { count: "exact" })
      .eq("user_id", user.id)
      .order("date", { ascending: false })
      .range(offset, offset + limit - 1);

    if (intensity && ["low", "medium", "high"].includes(intensity)) {
      query = query.eq("intensity", intensity);
    }

    const { data: logs, error, count } = await query;

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    const totalPages = Math.ceil((count ?? 0) / limit);

    // ── Aggregate stats across ALL logs (not just this page) ──────────
    const { data: allLogs } = await supabase
      .from("workout_logs")
      .select("intensity, date, soreness_reported, duration_minutes")
      .eq("user_id", user.id)
      .order("date", { ascending: false });

    const totalWorkouts = allLogs?.length ?? 0;
    const highCount = allLogs?.filter((l) => l.intensity === "high").length ?? 0;
    const avgIntensityPercent =
      totalWorkouts > 0 ? Math.round((highCount / totalWorkouts) * 100) : 0;

    // Active streak — consecutive days with at most 2-day gap
    const sortedDates = (allLogs ?? [])
      .map((l) => l.date)
      .sort()
      .reverse();

    let activeStreak = sortedDates.length > 0 ? 1 : 0;
    for (let i = 0; i < sortedDates.length - 1; i++) {
      const current = new Date(sortedDates[i]!);
      const prev = new Date(sortedDates[i + 1]!);
      const diffDays = Math.round(
        (current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diffDays <= 2) {
        activeStreak++;
      } else {
        break;
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        logs,
        stats: {
          totalWorkouts,
          avgIntensityPercent,
          activeStreak,
        },
        pagination: {
          page,
          limit,
          totalPages,
          totalCount: count ?? 0,
        },
      },
    });
  }
);