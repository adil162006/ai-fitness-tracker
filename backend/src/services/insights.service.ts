import { ai } from "../config/gemini";
import type { User } from "../types";

// ── Response schema ───────────────────────────────────────────────────────────
const insightsResponseSchema = {
  type: "object",
  required: ["insights"],
  properties: {
    insights: {
      type: "array",
      description: "List of AI-generated insights based on the user's workout data",
      items: {
        type: "object",
        required: ["type", "content"],
        properties: {
          type: {
            type: "string",
            enum: ["consistency", "fatigue", "recovery", "motivation", "performance"],
            description: "Category of the insight",
          },
          content: {
            type: "string",
            description: "The insight message — specific, actionable, and personalised to the user's data",
          },
        },
      },
    },
  },
};

export type InsightType =
  | "consistency"
  | "fatigue"
  | "recovery"
  | "motivation"
  | "performance";

export interface GeneratedInsight {
  type: InsightType;
  content: string;
}

interface WorkoutLogSummary {
  date: string;
  duration_minutes: number;
  intensity: string;
  soreness_reported: boolean;
  notes: string;
}

interface WeeklySummaryData {
  week_start: string;
  week_end: string;
  consistency_score: number;
  summary_text: string;
}

export async function generateInsights(
  user: User,
  recentLogs: WorkoutLogSummary[],
  weeklySummary: WeeklySummaryData | null
): Promise<GeneratedInsight[]> {
  const logsText =
    recentLogs.length > 0
      ? recentLogs
          .map(
            (l) =>
              `- ${l.date}: ${l.duration_minutes} min, intensity: ${l.intensity}, soreness: ${l.soreness_reported}, notes: "${l.notes}"`
          )
          .join("\n")
      : "No recent logs available.";

  const summaryText = weeklySummary
    ? `Week ${weeklySummary.week_start} to ${weeklySummary.week_end}: consistency score ${weeklySummary.consistency_score}/100. ${weeklySummary.summary_text}`
    : "No weekly summary available yet.";

  const prompt = `
You are an expert AI fitness coach. Analyse this user's workout data and generate personalised insights.

User Profile:
- Name: ${user.name}
- Age: ${user.age}
- Goal: ${user.fitness_goal}
- Experience: ${user.experience_level}
- Training days per week: ${user.weekly_availability}

Recent Workout Logs (last 7):
${logsText}

Latest Weekly Summary:
${summaryText}

Generate exactly 5 insights covering different aspects of the user's training.
Each insight must be specific to the data above — do not give generic advice.
Be concise, motivating, and actionable.
Cover a variety of types: consistency, fatigue, recovery, motivation, performance.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: insightsResponseSchema,
    },
  });

  const parsed = JSON.parse(response.text ?? "{}");
  return parsed.insights ?? [];
}