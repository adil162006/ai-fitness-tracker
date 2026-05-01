import supabase from "../lib/supabase";
import AsyncHandler from "../lib/AsyncHandler";
import type { Request, Response } from "express";
import type { User } from "../types";
import { generateInsights } from "../services/insights.service";

export const getInsights = AsyncHandler(
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

    // ── Return cached insights if already generated today ─────────────
    const { data: existingInsights } = await supabase
      .from("ai_insights")
      .select("*")
      .eq("user_id", user.id)
      .eq("generated_for_date", today)
      .order("created_at", { ascending: false });

    if (existingInsights && existingInsights.length > 0) {
      return res.status(200).json({ success: true, data: existingInsights });
    }

    // ── Fetch recent workout logs (last 7) ────────────────────────────
    const { data: recentLogs } = await supabase
      .from("workout_logs")
      .select("date, duration_minutes, intensity, soreness_reported, notes")
      .eq("user_id", user.id)
      .order("date", { ascending: false })
      .limit(7);

    // ── Fetch latest weekly summary ───────────────────────────────────
    const { data: weeklySummaries } = await supabase
      .from("weekly_summaries")
      .select("week_start, week_end, consistency_score, summary_text")
      .eq("user_id", user.id)
      .order("week_start", { ascending: false })
      .limit(1);

    const weeklySummary = weeklySummaries?.[0] ?? null;

    // ── Generate insights via Gemini ──────────────────────────────────
    const generated = await generateInsights(
      profile as User,
      recentLogs ?? [],
      weeklySummary
    );

    if (generated.length === 0) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate insights",
      });
    }

    // ── Save all generated insights ───────────────────────────────────
    const rows = generated.map((insight) => ({
      user_id: user.id,
      type: insight.type,
      content: insight.content,
      generated_for_date: today,
    }));

    const { data: saved, error: insertError } = await supabase
      .from("ai_insights")
      .insert(rows)
      .select();

    if (insertError) {
      return res.status(500).json({ success: false, message: insertError.message });
    }

    return res.status(201).json({ success: true, data: saved });
  }
);

export const refreshInsights = AsyncHandler(
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

    // ── Delete today's existing insights before regenerating ──────────
    await supabase
      .from("ai_insights")
      .delete()
      .eq("user_id", user.id)
      .eq("generated_for_date", today);

    // ── Fetch recent workout logs ─────────────────────────────────────
    const { data: recentLogs } = await supabase
      .from("workout_logs")
      .select("date, duration_minutes, intensity, soreness_reported, notes")
      .eq("user_id", user.id)
      .order("date", { ascending: false })
      .limit(7);

    // ── Fetch latest weekly summary ───────────────────────────────────
    const { data: weeklySummaries } = await supabase
      .from("weekly_summaries")
      .select("week_start, week_end, consistency_score, summary_text")
      .eq("user_id", user.id)
      .order("week_start", { ascending: false })
      .limit(1);

    const weeklySummary = weeklySummaries?.[0] ?? null;

    // ── Regenerate ────────────────────────────────────────────────────
    const generated = await generateInsights(
      profile as User,
      recentLogs ?? [],
      weeklySummary
    );

    if (generated.length === 0) {
      return res.status(500).json({
        success: false,
        message: "Failed to regenerate insights",
      });
    }

    const rows = generated.map((insight) => ({
      user_id: user.id,
      type: insight.type,
      content: insight.content,
      generated_for_date: today,
    }));

    const { data: saved, error: insertError } = await supabase
      .from("ai_insights")
      .insert(rows)
      .select();

    if (insertError) {
      return res.status(500).json({ success: false, message: insertError.message });
    }

    return res.status(201).json({ success: true, data: saved });
  }
);