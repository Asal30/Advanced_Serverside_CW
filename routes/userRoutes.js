import express from "express";
import { authenticate } from "../Middleware/authMiddleware.js";
import { profileImageParser } from "../Middleware/profileImageStorage.js";
import { updateUsername, updatePassword, updateProfilePicture, getUserById, updateBio, updateCity, updateUser, getUserStats } from "../controllers/userController.js";

const router = express.Router();

router.put("/:userId/username", authenticate, updateUsername);
router.put("/:userId/password", authenticate, updatePassword);
router.put("/:userId/profile-picture", authenticate, profileImageParser.single("profile_image"), updateProfilePicture);
router.put("/:userId/bio", authenticate, updateBio);
router.put("/:userId/city", authenticate, updateCity);
router.put("/:userId", authenticate,  profileImageParser.single("profile_image"), updateUser);
router.get("/:userId", authenticate, getUserById);
router.get("/:userId/stats", authenticate, getUserStats);

export default router;