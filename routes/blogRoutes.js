import express from "express";
import { authenticate } from "../Middleware/authMiddleware.js";
import { parser } from "../Middleware/localStorage.js";
import { getAllBlogs, getAllBlogsWithUserDetails, getBlogById, getBlogByIdWithUserDetails, createBlog, updateBlog, deleteBlog, getBlogsByUserId, recalculateBlogCounts } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/with-user", getAllBlogsWithUserDetails);
router.get("/:id", authenticate, getBlogById);
router.get("/:id/with-user", authenticate, getBlogByIdWithUserDetails);
router.get("/user/:userId", authenticate, getBlogsByUserId);
router.put("/:id", authenticate, parser.single("image"), updateBlog);
router.delete("/:id", authenticate, deleteBlog);
router.post("/recalculate-counts", recalculateBlogCounts);
router.post("/", authenticate, parser.single("image"), createBlog);

export default router;