"use client";

import { dashboardApi } from "@/api/dashboardApi";
import { useQuery } from "@tanstack/react-query";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: dashboardApi.getDashboard,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};
