import supabase from "../lib/supabase";
import type { Request, Response } from "express";
import AsyncHandler from "../lib/AsyncHandler";
import type {CompleteProfileForm,UpdateProfileForm} from '../types/index'

export const getMe = AsyncHandler(
  async (req: Request, res: Response) => {
    // 1️⃣ Get token from cookie OR Authorization header
    const token =
      req.cookies["sb-access-token"] ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    // 2️⃣ Get authenticated user from Supabase
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // 3️⃣ Fetch user profile from your "users" table
    const { data: userData, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    // 4️⃣ Return response
    res.status(200).json({
      success: true,
      user: userData,
    });
  }
);




export const updateUserProfile = AsyncHandler(
  async(req:Request,res:Response)=>{
    const {
      fullName,
      age,
      height,
      weight,
      fitnessGoal,
      experienceLevel,
      weeklyAvailability
    } = req.body as UpdateProfileForm;

    const token = req.cookies['sb-access-token'] || req.headers.authorization?.split(' ')[1];

    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) return res.status(401).json({ success: false, message: "Unauthorized" });
    const updateData: any = {};
    if (fullName !== undefined) updateData.name = fullName;
    if (age !== undefined) updateData.age = age;
    if (height !== undefined) updateData.height_cm = height;
    if (weight !== undefined) updateData.weight_kg = weight;
    if (fitnessGoal !== undefined) updateData.fitness_goal = fitnessGoal;
    if (experienceLevel !== undefined) updateData.experience_level = experienceLevel;
    if (weeklyAvailability !== undefined) updateData.weekly_availability = weeklyAvailability;

    // Perform the update in Supabase
    const { data, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", user.id)
      .select();

      
    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    res.status(200).json({ success: true, message: "Profile updated successfully", data });   
    
  }
)

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
        weekly_availability: weeklyAvailability,
        profile_completed:true
      })
      .eq('id', user.id)
      .select();
    if (error) return res.status(400).json({ success: false, message: error.message });

    res.status(200).json({ success: true, message: "Profile completed successfully", data });
  }
);