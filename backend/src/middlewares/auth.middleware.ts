import type { Request, Response, NextFunction } from "express";
import supabase from "../lib/supabase";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify token with Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid token",
      });
    }

    // attach user to request
    (req as any).user = data.user;

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};
