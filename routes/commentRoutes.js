import express from "express";
import { addComment, getCommentsByBlogId } from "../controllers/commentController.js";

const router = express.Router();

router.post("/", addComment);
router.get("/:blogId", getCommentsByBlogId);

export default router;