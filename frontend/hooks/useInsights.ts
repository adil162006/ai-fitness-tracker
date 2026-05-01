"use client";

import { insightsApi } from "@/api/insightsApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useInsights = () => {
  return useQuery({
    queryKey: ["insights"],
    queryFn: insightsApi.getInsights,
    staleTime: 1000 * 60 * 5,
  });
};

export const useRefreshInsights = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["refreshInsights"],
    mutationFn: insightsApi.refreshInsights,

    onSuccess: () => {
      toast.success("Insights refreshed!", {
        duration: 3000,
        position: "top-center",
      });
      queryClient.invalidateQueries({ queryKey: ["insights"] });
    },

    onError: (error: unknown) => {
      const err = error as { message?: string };
      toast.error(err?.message || "Failed to refresh insights", {
        duration: 4000,
        position: "top-center",
      });
    },
  });
};
