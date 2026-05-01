import axiosInstance from "@/lib/axios";

export const weeklySummaryApi = {
  getWeeklySummary: async (weekStart?: string) => {
    let url = "/weekly-summary/summary";
    if (weekStart) url += `?week_start=${weekStart}`;
    const response = await axiosInstance.get(url);
    return response.data;
  },

  getAllWeeklySummaries: async () => {
    const response = await axiosInstance.get("/weekly-summary/summary/all");
    return response.data;
  },
};
