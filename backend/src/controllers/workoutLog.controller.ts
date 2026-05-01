import supabase from "../lib/supabase";
import AsyncHandler from "../lib/AsyncHandler";
import type { Request, Response } from "express";

interface LogExercise {
  name: string;
  sets: number;
  reps: number;
  weight: number; // kg — user enters this in the form
}

interface WorkoutLogBody {
  exercises: LogExercise[];
  duration_minutes: number;
  intensity: "low" | "medium" | "high";
  soreness_reported: boolean;
  notes?: string;
}

export const createWorkoutLog = AsyncHandler(
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

    // ── Validate body ─────────────────────────────────────────────────
    const {
      exercises,
      duration_minutes,
      intensity,
      soreness_reported,
      notes,
    } = req.body as WorkoutLogBody;

    if (!exercises || exercises.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one exercise is required",
      });
    }

    if (!duration_minutes || duration_minutes <= 0) {
      return res.status(400).json({
        success: false,
        message: "Duration is required",
      });
    }

    if (!intensity || !["low", "medium", "high"].includes(intensity)) {
      return res.status(400).json({
        success: false,
        message: "Intensity must be low, medium, or high",
      });
    }

    // ── Insert log ────────────────────────────────────────────────────
    const today = new Date().toISOString().split("T")[0]!;

    const { data: log, error: insertError } = await supabase
      .from("workout_logs")
      .insert({
        user_id: user.id,
        date: today,
        exercises,             // jsonb — stores the array as-is
        duration_minutes,
        intensity,
        soreness_reported: soreness_reported ?? false,
        notes: notes ?? "",
      })
      .select()
      .single();

    if (insertError) {
      return res.status(500).json({
        success: false,
        message: insertError.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Workout logged successfully",
      data: log,
    });
  }
);

export const getWorkoutLogs = AsyncHandler(
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

    // ── Optional ?limit query param ───────────────────────────────────
    const limit = parseInt(req.query.limit as string) || 10;

    const { data: logs, error } = await supabase
      .from("workout_logs")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false })
      .limit(limit);

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({ success: true, data: logs });
  }
);