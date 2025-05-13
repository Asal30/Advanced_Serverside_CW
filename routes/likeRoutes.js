import express from "express";
import { addLike, removeLike, checkLikeStatus } from "../controllers/likeController.js";

const router = express.Router();

router.post("/add", addLike);
router.post("/remove", removeLike);
router.get("/status", checkLikeStatus); // New route to check like status

export default router;