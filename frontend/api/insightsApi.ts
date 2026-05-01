import axiosInstance from "@/lib/axios";

export const insightsApi = {
  getInsights: async () => {
    const response = await axiosInstance.get("/insights/insights");
    return response.data;
  },

  refreshInsights: async () => {
    const response = await axiosInstance.post("/insights/insights/refresh");
    return response.data;
  },
};
