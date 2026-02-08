import axiosInstance from "@/lib/axios";

type FitnessGoal =
  | "lose-weight"
  | "gain-muscle"
  | "stay-fit"
  | "improve-strength"
  | "endurance";

 type ExperienceLevel =
  | "beginner"
  | "intermediate"
  | "advanced";

 type WeeklyAvailability =
  | "1-2"
  | "3-4"
  | "5-6"
  | "daily";
 interface CompleteProfileData {
  age: number;
  height: number;
  weight: number;
  fitnessGoal: FitnessGoal;
  experienceLevel: ExperienceLevel;
  weeklyAvailability: WeeklyAvailability;
}
interface UpdateUserData{
  fullName:string;
  age: number;
  height: number;
  weight: number;
  fitnessGoal: FitnessGoal;
  experienceLevel: ExperienceLevel;
  weeklyAvailability: WeeklyAvailability;
}



export const userApi={
  getme:async()=>{
    const response = await axiosInstance.get('/user/getMe');
    return response.data
  },
    completeProfile : async (data:CompleteProfileData)=>{
    const response = await axiosInstance.post('/user/complete-profile', data);
    return response.data;
    },
    updateUser:async (data:UpdateUserData)=>{
      const response = await axiosInstance.patch('/user/update-profile',data)
      return response.data;
    }
}