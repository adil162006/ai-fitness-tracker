import axiosInstance from "@/lib/axios";

export interface CreateWorkoutLogData {
  exercises: {
    name: string;
    sets: number;
    reps: number;
    weight: number;
  }[];
  duration_minutes: number;
  intensity: "low" | "medium" | "high";
  soreness_reported: boolean;
  notes?: string;
}

export const workoutApi = {
  getTodaysPlan: async () => {
    const response = await axiosInstance.get("/ai/workout/today");
    return response.data;
  },

  createWorkoutLog: async (data: CreateWorkoutLogData) => {
    const response = await axiosInstance.post("/workouts/logs", data);
    return response.data;
  },

  getWorkoutLogs: async (limit: number = 10) => {
    const response = await axiosInstance.get(`/workouts/logs?limit=${limit}`);
    return response.data;
  },

  getWorkoutHistory: async (
    page: number = 1,
    limit: number = 10,
    intensity?: string
  ) => {
    let url = `/workouts/history?page=${page}&limit=${limit}`;
    if (intensity) url += `&intensity=${intensity}`;
    const response = await axiosInstance.get(url);
    return response.data;
  },
};
