import express from "express";
import { register, login, generateApiKey } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/generate-api-key", generateApiKey);

export default router;