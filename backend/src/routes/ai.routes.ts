import { Router } from "express";
import { getTodaysPlan } from "../controllers/ai.controller";


const router = Router();

router.get("/workout/today", getTodaysPlan);

export default router;