import express from "express";
import { authenticate } from "../authMiddleware.js";
import { updateUsername, updatePassword, updateProfilePicture, getUserById, updateBio, updateCity, updateUser, getUserStats } from "../controllers/userController.js";

const router = express.Router();

router.put("/:userId/username", authenticate, updateUsername);
router.put("/:userId/password", authenticate, updatePassword);
router.put("/:userId/profile-picture", authenticate, updateProfilePicture);
router.put("/:userId/bio", authenticate, updateBio);
router.put("/:userId/city", authenticate, updateCity);
router.put("/:userId", authenticate, updateUser);
router.get("/:userId", authenticate, getUserById);
router.get("/:userId/stats", authenticate, getUserStats);

export default router;