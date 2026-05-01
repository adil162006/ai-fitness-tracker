import { Router } from "express";
import { getWeeklySummary, getAllWeeklySummaries } from "../controllers/weeklySummary.controller";

const router = Router();    

router.get("/summary", getWeeklySummary);           // ?week_start=2025-01-06
router.get("/summary/all", getAllWeeklySummaries);


export default router;