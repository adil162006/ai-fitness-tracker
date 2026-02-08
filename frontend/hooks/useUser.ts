"use client";

import { userApi } from "@/api/userApi";
import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

/* =======================
Types
======================= */

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

interface UpdateUserData {
fullName: string;
age: number;
height: number;
weight: number;
fitnessGoal: FitnessGoal;
experienceLevel: ExperienceLevel;
weeklyAvailability: WeeklyAvailability;
}

/* =======================
Error Helper
======================= */

const getErrorMessage = (error: unknown): string => {
const err = error as {
response?: { data?: { message?: string } };
message?: string;
};

return (
err?.response?.data?.message ||
err?.message ||
"Something went wrong. Please try again."
);
};

/* =======================
Get Current User
======================= */

export const useGetMe = () => {
const { data, isLoading, isError, error, refetch } = useQuery({
queryKey: ["getMe"],
queryFn: userApi.getme,
retry: 1,
});

if (isError && error) {
toast.error(getErrorMessage(error), {
duration: 4000,
position: "top-center",
});
}

return {
user: data?.user ?? null,
isLoading,
isError,
refetch,
};
};

/* =======================
Complete Profile
======================= */

export const useCompleteProfile = () => {
return useMutation({
mutationKey: ["completeProfile"],
mutationFn: (data: CompleteProfileData) =>
userApi.completeProfile(data),

onSuccess: (response: { message?: string }) => {
  toast.success(response?.message || "Profile completed successfully", {
    duration: 3000,
    position: "top-center",
  });
},

onError: (error: unknown) => {
  toast.error(getErrorMessage(error), {
    duration: 4000,
    position: "top-center",
  });
},

});
};

/* =======================
Update Profile
======================= */

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
return useMutation({
mutationKey: ["updateUser"],
mutationFn: (data: UpdateUserData) =>
userApi.updateUser(data),

onSuccess: (response: { message?: string }) => {
  toast.success(response?.message || "Profile updated successfully", {
    duration: 3000,
    position: "top-center",
  });
  queryClient.invalidateQueries({ queryKey: ["getMe"] });
},

onError: (error: unknown) => {
  toast.error(getErrorMessage(error), {
    duration: 4000,
    position: "top-center",
  });
},

});
};
