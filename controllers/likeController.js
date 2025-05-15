import Like from "../models/Like.js";
import Blog from "../models/Blog.js";

export const addLike = async (req, res) => {
  try {
    const { blogId, userId } = req.body;
    await Like.addLike(blogId, userId);
    await Blog.updateLikesCount(blogId);
    const likesCount = await Like.getLikesCount(blogId);
    res.json({ message: "Like added", likesCount });
  } catch (error) {
    console.error("Failed to add like:", error);
    res.status(500).json({ error: "Failed to add like" });
  }
};

export const removeLike = async (req, res) => {
  try {
    const { blogId, userId } = req.body;
    await Like.removeLike(blogId, userId);
    await Blog.updateLikesCount(blogId);
    const likesCount = await Like.getLikesCount(blogId);
    res.json({ message: "Like removed", likesCount });
  } catch (error) {
    console.error("Failed to remove like:", error);
    res.status(500).json({ error: "Failed to remove like" });
  }
};

export const checkLikeStatus = async (req, res) => {
  try {
    const { blogId, userId } = req.query;
    const liked = await Like.checkLikeStatus(blogId, userId);
    res.json({ liked });
  } catch (error) {
    console.error("Failed to check like status:", error);
    res.status(500).json({ error: "Failed to check like status" });
  }
};

export const getLikesCount = async (req, res) => {
  try {
    const { blogId } = req.query;
    const likesCount = await Like.getLikesCount(blogId);
    res.json({ likesCount });
  } catch (error) {
    console.error("Failed to get likes count:", error);
    res.status(500).json({ error: "Failed to get likes count" });
  }
}