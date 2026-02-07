import type { Request, Response, NextFunction } from "express";
import supabase from "../lib/supabase";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check cookie first, then Authorization header as fallback
    const token = 
      req.cookies['sb-access-token'] || 
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token provided",
      });
    }

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