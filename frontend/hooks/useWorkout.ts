"use client";

import { workoutApi, type CreateWorkoutLogData } from "@/api/workoutApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useTodaysPlan = () => {
  return useQuery({
    queryKey: ["todaysPlan"],
    queryFn: workoutApi.getTodaysPlan,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCreateWorkoutLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createWorkoutLog"],
    mutationFn: (data: CreateWorkoutLogData) =>
      workoutApi.createWorkoutLog(data),

    onSuccess: (response: { message?: string }) => {
      toast.success(response?.message || "Workout logged successfully!", {
        duration: 3000,
        position: "top-center",
      });
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["workoutLogs"] });
      queryClient.invalidateQueries({ queryKey: ["workoutHistory"] });
      queryClient.invalidateQueries({ queryKey: ["weeklySummary"] });
    },

    onError: (error: unknown) => {
      const err = error as { message?: string };
      toast.error(err?.message || "Failed to log workout", {
        duration: 4000,
        position: "top-center",
      });
    },
  });
};

export const useWorkoutLogs = (limit: number = 10) => {
  return useQuery({
    queryKey: ["workoutLogs", limit],
    queryFn: () => workoutApi.getWorkoutLogs(limit),
  });
};

export const useWorkoutHistory = (
  page: number = 1,
  limit: number = 10,
  intensity?: string
) => {
  return useQuery({
    queryKey: ["workoutHistory", page, limit, intensity],
    queryFn: () => workoutApi.getWorkoutHistory(page, limit, intensity),
  });
};
