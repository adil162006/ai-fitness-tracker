// import { generateWorkOutPlan } from "../services/workoutPlan.service";
// import supabase from "../lib/supabase";
// import AsyncHandler from "../lib/AsyncHandler";
// import type { Request, Response } from "express";
// import type { User } from "../types";
// type WorkoutPlan = {
//   exercises: any[];
//   difficulty: string;
//   explanation: string;
//   source: string;
// };


// export const getTodaysPlan = AsyncHandler(
//   async (req: Request, res: Response) => {

//     const token =
//       req.cookies['sb-access-token'] ||
//       req.headers.authorization?.split(' ')[1];

//     const { data, error: userError } = await supabase.auth.getUser(token);

//     if (userError || !data.user) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const user = data.user;

//     const { data: profile, error: profileError } = await supabase
//       .from('users')
//       .select('*')
//       .eq('id', user.id)
//       .single();

//     if (profileError || !profile) {
//       return res.status(404).json({ message: "Profile not found" });
//     }

//     // ✅ Correct typing
//     const result = await generateWorkOutPlan(profile as User);

//     const today = new Date().toISOString().split('T')[0];

//     const { data: savedPlan, error: insertError } = await supabase
//       .from('workout_plans')
//       .upsert(
//         {
//           user_id: user.id,
//           date: today,
//           exercises: result.exercises,
//           difficulty: result.difficulty,
//           explanation: result.explanation,
//           source: result.source
//         },
//         { onConflict: 'user_id,date' }
//       )
//       .select()
//       .single();

//     if (insertError) {
//       return res.status(500).json({ error: insertError.message });
//     }

//     return res.json(savedPlan);
//   }
// );
// ;
