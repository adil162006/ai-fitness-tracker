import { Router } from "express";
import { completeUserProfile } from "../controllers/user.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.use(protect)
router.post("/complete-profile",completeUserProfile)

export default router;