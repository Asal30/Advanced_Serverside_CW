import express from "express";
import { authenticate } from "../authMiddleware.js";
import { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog,} from '../controllers/blogController.js';

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/", authenticate, createBlog);
router.put("/:id", authenticate, updateBlog);
router.delete("/:id", authenticate, deleteBlog);

export default router;