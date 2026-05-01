import { Router } from "express";
import { createWorkoutLog, getWorkoutLogs } from "../controllers/workoutLog.controller";

const router = Router()

// ── Workout log routes ────────────────────────────────────────────
router.post("/logs", createWorkoutLog);
router.get("/logs", getWorkoutLogs);

export default router;