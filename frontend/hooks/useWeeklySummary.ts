"use client";

import { weeklySummaryApi } from "@/api/weeklySummaryApi";
import { useQuery } from "@tanstack/react-query";

export const useWeeklySummary = (weekStart?: string) => {
  return useQuery({
    queryKey: ["weeklySummary", weekStart],
    queryFn: () => weeklySummaryApi.getWeeklySummary(weekStart),
    staleTime: 1000 * 60 * 5,
  });
};

export const useAllWeeklySummaries = () => {
  return useQuery({
    queryKey: ["allWeeklySummaries"],
    queryFn: weeklySummaryApi.getAllWeeklySummaries,
  });
};
