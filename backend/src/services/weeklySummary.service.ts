import { ai } from "../config/gemini";
import type { User } from "../types";

// ── Response schema ───────────────────────────────────────────────────────────
const weeklySummaryResponseSchema = {
  type: "object",
  required: ["summary_text", "consistency_score", "win", "gap", "next_week_focus"],
  properties: {
    summary_text: {
      type: "string",
      description:
        "A comprehensive 3-5 sentence paragraph summarising the user's week — mention specific numbers, exercises, and progress",
    },
    consistency_score: {
      type: "number",
      description:
        "Integer 0-100 representing how consistent the user was this week based on planned vs completed workouts",
    },
    win: {
      type: "string",
      description:
        "1-2 sentences highlighting the biggest achievement or positive trend from this week's data",
    },
    gap: {
      type: "string",
      description:
        "1-2 sentences identifying the most important area for improvement, based only on the data provided",
    },
    next_week_focus: {
      type: "string",
      description:
        "1-2 sentences recommending the specific focus for next week based on this week's performance",
    },
  },
};

export interface GeneratedWeeklySummary {
  summary_text: string;
  consistency_score: number;
  win: string;
  gap: string;
  next_week_focus: string;
}

interface WorkoutLogInput {
  date: string;
  duration_minutes: number;
  intensity: string;
  soreness_reported: boolean;
  notes: string;
  exercises: any[];
}

export async function generateWeeklySummary(
  user: User,
  weekStart: string,
  weekEnd: string,
  logs: WorkoutLogInput[],
  plannedDays: number // weekly_availability from user profile
): Promise<GeneratedWeeklySummary> {
  const logsText =
    logs.length > 0
      ? logs
          .map(
            (l) =>
              `- ${l.date} (${l.intensity} intensity, ${l.duration_minutes} min, soreness: ${l.soreness_reported}): ${l.exercises.map((e: any) => e.name).join(", ")} — "${l.notes}"`
          )
          .join("\n")
      : "No workouts logged this week.";

  const prompt = `
You are an expert AI fitness coach. Generate a weekly performance summary for this user.

User Profile:
- Name: ${user.name}
- Age: ${user.age}
- Goal: ${user.fitness_goal}
- Experience: ${user.experience_level}
- Planned workouts per week: ${plannedDays}

Week: ${weekStart} to ${weekEnd}
Workouts completed: ${logs.length} out of ${plannedDays} planned

Workout Logs:
${logsText}

Analyse the data above and generate the summary. Be specific — reference actual exercises, durations, and patterns from the logs.
Do not invent data that is not present in the logs.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: weeklySummaryResponseSchema,
    },
  });

  const parsed = JSON.parse(response.text ?? "{}");

  return {
    summary_text: parsed.summary_text ?? "",
    consistency_score: Math.min(Math.max(Math.round(parsed.consistency_score ?? 0), 0), 100),
    win: parsed.win ?? "",
    gap: parsed.gap ?? "",
    next_week_focus: parsed.next_week_focus ?? "",
  };
}