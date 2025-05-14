import express from "express";
import { addLike, removeLike, checkLikeStatus, getLikesCount } from "../controllers/likeController.js";

const router = express.Router();

router.get("/count", getLikesCount);
router.post("/add", addLike);
router.post("/remove", removeLike);
router.get("/status", checkLikeStatus);

export default router;