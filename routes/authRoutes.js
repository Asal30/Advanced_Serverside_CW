import express from "express";
import { register, login, generateApiKey } from "../controllers/authController.js";
import { authenticate } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/generate-api-key", authenticate, generateApiKey);

export default router;