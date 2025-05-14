import express from "express";
import { authenticate } from "../authMiddleware.js";
import { updateUsername, updatePassword, updateProfilePicture } from "../controllers/userController.js";

const router = express.Router();

router.put("/:userId/username", authenticate, updateUsername);
router.put("/:userId/password", authenticate, updatePassword);
router.put("/:userId/profile-picture", authenticate, updateProfilePicture);

export default router;