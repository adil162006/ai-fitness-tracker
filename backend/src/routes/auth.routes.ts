import { Router } from "express";
import { signupController, loginController, logoutController } from "../controllers/auth.controller";
import { arcjetProtection } from "../middlewares/arcjet.middleware";

const router = Router();
router.use(arcjetProtection); // Apply Arcjet protection to all auth routes
// Signup route
router.post("/signup", signupController);

// Login route
router.post("/login", loginController);

router.post("/logout",logoutController)
export default router;
