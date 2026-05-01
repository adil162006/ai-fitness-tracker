import { Router } from "express";
import { getWorkoutHistory } from "../controllers/workoutHistory.controller";

const router = Router();


// ── Workout history (paginated + filtered) ────────────────────────
router.get("/history", getWorkoutHistory);

export default router;