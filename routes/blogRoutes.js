import express from "express";
import { authenticate } from "../authMiddleware.js";
import { getAllBlogs, getAllBlogsWithUserDetails, getBlogById, getBlogByIdWithUserDetails, createBlog, updateBlog, deleteBlog, getBlogsByUserId, recalculateBlogCounts } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/with-user", getAllBlogsWithUserDetails);
router.get("/:id", authenticate, getBlogById);
router.get("/:id/with-user", authenticate, getBlogByIdWithUserDetails); // New route
router.get("/user/:userId", authenticate, getBlogsByUserId);
router.post("/", authenticate, createBlog);
router.put("/:id", authenticate, updateBlog);
router.delete("/:id", authenticate, deleteBlog);
router.post("/recalculate-counts", recalculateBlogCounts); // New route to recalculate counts

export default router;