import { Router } from "express";
import { completeUserProfile, getMe, updateUserProfile } from "../controllers/user.controller";
import { protect } from "../middlewares/auth.middleware";
import { arcjetProtection } from "../middlewares/arcjet.middleware";
const router = Router();
router.use(arcjetProtection) // Apply Arcjet protection to all user routes
router.use(protect)
router.get("/getMe",getMe)
router.post("/complete-profile",completeUserProfile)
router.patch("/update-profile",updateUserProfile)

export default router;