import { Router } from "express";
import { signupController, loginController } from "../controllers/auth.controller";

const router = Router();

// Signup route
router.post("/signup", signupController);

// Login route
router.post("/login", loginController);

export default router;
