import supabase from "../lib/supabase";
import type { Request, Response } from "express";
import AsyncHandler from "../lib/AsyncHandler";
import type {CompleteProfileForm} from '../types/index'

export const completeUserProfile = AsyncHandler(
  async (req: Request, res: Response) => {
    const {
      age,
      height,
      weight,
      fitnessGoal,
      experienceLevel,
      weeklyAvailability
    } = req.body as CompleteProfileForm;

    if (!age || !height || !weight || !fitnessGoal || !experienceLevel || !weeklyAvailability)
      return res.status(400).json({ success: false, message: "All fields are required" });

    const token = req.cookies['sb-access-token'] || req.headers.authorization?.split(' ')[1];

    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) return res.status(401).json({ success: false, message: "Unauthorized" });

    const { data, error } = await supabase
      .from('users')
      .update({
        age,
        height_cm: height,
        weight_kg: weight,
        fitness_goal: fitnessGoal,
        experience_level: experienceLevel,
        weekly_availability: weeklyAvailability
      })
      .eq('id', user.id)
      .select();
    if (error) return res.status(400).json({ success: false, message: error.message });

    res.status(200).json({ success: true, message: "Profile completed successfully", data });
  }
);