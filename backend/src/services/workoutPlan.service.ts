import { ai } from "../config/gemini";
import type { User, WeeklyPlan, DayPlan } from "../types";

const workoutPlanResponseSchema = {
  type: "object",
  required: ["days"],
  properties: {
    days: {
      type: "array",
      description: "Workout plans for each training day — only include training days, NOT rest days",
      items: {
        type: "object",
        required: ["day_of_week", "difficulty", "explanation", "exercises"],
        properties: {
          day_of_week: {
            type: "string",
            enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            description: "The day of the week this workout is scheduled for",
          },
          difficulty: {
            type: "string",
            enum: ["easy", "medium", "hard"],
            description: "Difficulty level suited to the user's experience and goal",
          },
          explanation: {
            type: "string",
            description: "Brief explanation of why this workout suits the user's profile and goals",
          },
          exercises: {
            type: "array",
            description: "List of exercises for this training day",
            items: {
              type: "object",
              required: ["name", "sets", "reps", "rest_seconds", "note"],
              properties: {
                name: { type: "string", description: "Name of the exercise" },
                sets: { type: "number", description: "Number of sets" },
                reps: { type: "string", description: "Rep range or count, e.g. '8-10' or '12'" },
                rest_seconds: { type: "number", description: "Rest time between sets in seconds" },
                note: { type: "string", description: "Form tip or coaching cue for this exercise" },
              },
            },
          },
        },
      },
    },
  },
};

const DAYS_OF_WEEK = [
  "Monday", "Tuesday", "Wednesday", "Thursday",
  "Friday", "Saturday", "Sunday",
] as const;

function getMondayOfCurrentWeek(): string {
  const now = new Date();
  const day = now.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday);
  return monday.toISOString().split("T")[0]!; // ✅ non-null assertion — split always produces index 0
}

function selectTrainingDays(weeklyAvailability: number): string[] {
  const spreads: Record<number, string[]> = {
    2: ["Monday", "Thursday"],
    4: ["Monday", "Tuesday", "Thursday", "Saturday"],
    6: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    7: [...DAYS_OF_WEEK],
  };
  const fallback: string[] = ["Monday", "Tuesday", "Thursday", "Saturday"]; // ✅ explicit type — not a Record lookup
  return spreads[weeklyAvailability] ?? fallback;
}

export async function generateWorkOutPlan(user: User): Promise<WeeklyPlan> {
  const weekStart = getMondayOfCurrentWeek();
  const trainingDays = selectTrainingDays(user.weekly_availability);

  const prompt = `
You are an expert fitness coach. Generate a weekly workout plan for this user:

Name: ${user.name}
Age: ${user.age}
Weight: ${user.weight_kg}kg
Height: ${user.height_cm}cm
Fitness goal: ${user.fitness_goal}
Experience level: ${user.experience_level}
Training days this week: ${trainingDays.join(", ")}

Generate a workout ONLY for these training days: ${trainingDays.join(", ")}.
Do NOT include rest days in your response — the application handles those automatically.
Tailor exercise selection, volume, and difficulty to the user's experience level and goal.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: workoutPlanResponseSchema,
    },
  });

  const parsed = JSON.parse(response.text ?? "{}");

  const trainingDaySet = new Set(trainingDays);
  const aiDayMap: Record<string, any> = {};
  for (const d of (parsed.days ?? [])) {
    aiDayMap[d.day_of_week] = d;
  }

  const allDays: DayPlan[] = DAYS_OF_WEEK.map((day) => {
    if (trainingDaySet.has(day) && aiDayMap[day]) {
      return {
        day_of_week: day,
        exercises: aiDayMap[day].exercises ?? [],
        is_rest_day: false,
        difficulty: aiDayMap[day].difficulty,
        explanation: aiDayMap[day].explanation,
      };
    }
    return {
      day_of_week: day,
      exercises: [],
      is_rest_day: true,
      difficulty: "none",
      explanation: "Rest day — recovery is part of the plan.",
    };
  });

  return { week_start: weekStart, days: allDays, source: "gemini" };
}