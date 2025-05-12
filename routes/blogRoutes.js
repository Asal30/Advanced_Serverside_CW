import express from "express";
import { authenticate } from "../authMiddleware.js";
import { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog, getBlogsByUserId } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", authenticate, getBlogById);
router.get("/user/:userId", authenticate, getBlogsByUserId);
router.post("/", authenticate, createBlog);
router.put("/:id", authenticate, updateBlog);
router.delete("/:id", authenticate, deleteBlog);

export default router;