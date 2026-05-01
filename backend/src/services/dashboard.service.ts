import { ai } from "../config/gemini";
import type { User } from "../types";

// ── Response schema ───────────────────────────────────────────────────────────
const dashboardInsightSchema = {
  type: "object",
  required: ["tip"],
  properties: {
    tip: {
      type: "string",
      description:
        "A single concise AI coach tip (2-3 sentences) based on the user's recent activity. Motivating and specific.",
    },
  },
};

interface RecentLogSummary {
  duration_minutes: number;
  intensity: string;
  soreness_reported: boolean;
}

export async function generateCoachTip(
  user: User,
  recentLogs: RecentLogSummary[]
): Promise<string> {
  const logsText =
    recentLogs.length > 0
      ? recentLogs
          .map(
            (l) =>
              `${l.duration_minutes} min, ${l.intensity} intensity, soreness: ${l.soreness_reported}`
          )
          .join(" | ")
      : "No recent logs yet.";

  const prompt = `
You are an expert AI fitness coach. Give a single motivating tip for today based on this user's recent data.

User: ${user.name}, goal: ${user.fitness_goal}, experience: ${user.experience_level}
Recent sessions: ${logsText}

Keep it 2-3 sentences. Be specific, not generic.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: dashboardInsightSchema,
    },
  });

  const parsed = JSON.parse(response.text ?? "{}");
  return parsed.tip ?? "Keep pushing — consistency is the key to progress!";
}