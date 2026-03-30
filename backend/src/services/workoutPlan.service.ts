import { ai } from "../config/gemini";
import type { User, WorkoutPlan } from "../types";

// export async function generateWorkOutPlan(user: User): Promise<WorkoutPlan> {
//   const prompt = `
// You are a professional fitness trainer.

// Create a simple 1-day workout plan.

// USER PROFILE:
// Age: ${user.age}
// Height: ${user.height} cm
// Weight: ${user.weight} kg
// Goal: ${user.fitnessGoal}
// Experience: ${user.experienceLevel}
// Weekly availability: ${user.weeklyAvailability} days

// Return STRICT JSON:

// {
//   "exercises": [
//     {
//       "name": "",
//       "sets": "",
//       "reps": "",
//       "weight":"",
//       "Rest":"",
//       "note":""
//     }
//   ],
//   "difficulty": "",
//   "explanation": ""
// }
// `;

//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: prompt,
//   });

//   const text = response.text ?? "";

//   // Try direct JSON parse; if that fails, try to extract a JSON object from the text
//   let parsed: any;
//   try {
//     parsed = JSON.parse(text);
//   } catch (err) {
//     const start = text.indexOf("{");
//     const end = text.lastIndexOf("}");
//     if (start !== -1 && end !== -1 && end > start) {
//       const jsonSub = text.slice(start, end + 1);
//       parsed = JSON.parse(jsonSub);
//     } else {
//       throw new Error("Unable to parse AI response as JSON: " + text.slice(0, 200));
//     }
//   }

//   return {
//     exercises: parsed.exercises ?? [],
//     difficulty: parsed.difficulty ?? "unknown",
//     explanation: parsed.explanation ?? "",
//     source: "gemini",
//   } as WorkoutPlan;
// }