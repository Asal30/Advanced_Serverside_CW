import Comment from "../models/Comment.js";
import Blog from "../models/Blog.js";

export const addComment = async (req, res) => {
  try {
    const { blogId, userId, comment } = req.body;
    const newComment = await Comment.addComment(blogId, userId, comment);
    await Blog.updateCommentsCount(blogId); // Update comments count in the blogs table
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Failed to add comment:", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

export const getCommentsByBlogId = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.getCommentsByBlogId(blogId);
    res.json(comments);
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};