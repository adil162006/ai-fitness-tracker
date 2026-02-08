"use client";
import { authApi } from "@/api/authApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface SignupData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    email: string;
    profile_completed: boolean;
  };
}

interface SignupResponse {
  success: boolean;
  message: string;
  user: unknown;
}

/**
 * Reusable error message extractor (removes need for `any`)
 */
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

export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["signup"],
    mutationFn: (data: SignupData) => authApi.signup(data),

    onSuccess: (response: SignupResponse) => {
      toast.success(
        response.message || "Signup successful! Please login to continue.",
        {
          duration: 4000,
          position: "top-center",
        }
      );

      // Redirect to login page after successful signup
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    },

    onError: (error: unknown) => {
      toast.error(getErrorMessage(error), {
        duration: 4000,
        position: "top-center",
      });
    },
  });
};

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginData) => authApi.login(data),

    onSuccess: (response: LoginResponse) => {
      toast.success(response.message || "Login successful!", {
        duration: 3000,
        position: "top-center",
      });

      // Check if profile is completed
      if (response.user.profile_completed) {
        // Redirect to dashboard if profile is complete
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        // Redirect to complete profile if not completed
        setTimeout(() => {
          router.push("/complete-profile");
        }, 1000);
      }
    },

    onError: (error: unknown) => {
      toast.error(getErrorMessage(error), {
        duration: 4000,
        position: "top-center",
      });
    },
  });
};

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: authApi.logout,

    onSuccess: () => {
      toast.success("Logged out successfully!", {
        duration: 3000,
        position: "top-center",
      });

      // Clear any local storage
      localStorage.clear();

      // Redirect to login page
      setTimeout(() => {
        router.push("/auth/login");
      }, 1000);
    },

    onError: (error: unknown) => {
      toast.error(getErrorMessage(error), {
        duration: 4000,
        position: "top-center",
      });
    },
  });
};
