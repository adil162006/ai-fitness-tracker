import { Router } from "express";

import { getInsights, refreshInsights } from "../controllers/insights.controller";



const router = Router();

// ── Insights routes ───────────────────────────────────────────────
router.get("/insights", getInsights);
router.post("/insights/refresh", refreshInsights);

export default router;