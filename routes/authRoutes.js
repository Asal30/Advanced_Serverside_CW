import express from "express";
import { authenticate } from "../authMiddleware.js";
import { register, login, generateApiKey } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/generate-api-key", authenticate, generateApiKey);

export default router;