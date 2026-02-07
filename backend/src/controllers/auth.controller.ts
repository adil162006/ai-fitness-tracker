import supabase from "../lib/supabase";
import type { Request, Response } from "express";
import AsyncHandler from "../lib/AsyncHandler";
import  type { LoginForm,SignupForm } from "../types";

export const signupController = AsyncHandler(
  async (req: Request, res: Response) => {
    const { fullName, email, password, confirmPassword } = req.body as SignupForm;

    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (!data.user) {
      return res.status(400).json({
        success: false,
        message: "User creation failed",
      });
    }

    const { error: profileError } = await supabase.from("users").insert([
      {
        id: data.user.id,
        email: data.user.email,
        name: fullName,
      },
    ]);

    if (profileError) {
      return res.status(400).json({
        success: false,
        message: "User created but profile failed",
        details: profileError.message,
      });
    }

    if (data.session?.access_token) {
      res.cookie("sb-access-token", data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600 * 1000, // 1 hour
        sameSite: "lax",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Signup successful. Please verify your email before logging in.",
      user: data.user,
    });
  }
);

export const loginController = AsyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body as LoginForm;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const user = data.user;

    if (!user?.email_confirmed_at) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in",
      });
    }

    if (data.session?.access_token) {
      res.cookie("sb-access-token", data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600 * 1000, // 1 hour
        sameSite: "lax",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  }
);