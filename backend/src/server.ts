import express from 'express'
import cors from "cors"
import type { Request,Response } from 'express';

import { Router } from "express";
import authRoutes from './routes/auth.routes'

const router = Router();
const app =express();
const allowedOrigins = [
  "http://localhost:3000    ", // Next js
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // allow credentials from client (cookies, authorization headers, etc.)
  })
);


app.use(express.json()); // parses incoming JSON request bodies and makes them available as req.body in your route handlers
app.use("/api/auth", authRoutes);
app.get("/health", (req:Request, res:Response) => {
  res.json({ status: "ok", message: "Server is running" });
});
router.use("/auth", authRoutes);


export default app;