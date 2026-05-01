import axiosInstance from "@/lib/axios";

export const dashboardApi = {
  getDashboard: async () => {
    const response = await axiosInstance.get("/dashboard/dashboard");
    return response.data;
  },
};
