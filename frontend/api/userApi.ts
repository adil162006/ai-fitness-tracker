import axiosInstance from "@/lib/axios";
import { data } from "framer-motion/client";
export type FitnessGoal =
  | "lose-weight"
  | "gain-muscle"
  | "stay-fit"
  | "improve-strength"
  | "endurance";

export type ExperienceLevel =
  | "beginner"
  | "intermediate"
  | "advanced";

export type WeeklyAvailability =
  | "1-2"
  | "3-4"
  | "5-6"
  | "daily";
export interface CompleteProfileData {
  age: number;
  height: number;
  weight: number;
  fitnessGoal: FitnessGoal;
  experienceLevel: ExperienceLevel;
  weeklyAvailability: WeeklyAvailability;
}

export const userApi={
    completeProfile : async (data:CompleteProfileData)=>{
    const response = await axiosInstance.post('/auth/complete-profile', data);
    return response.data;
    }
}