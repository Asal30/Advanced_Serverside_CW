import Like from "../models/Like.js";

export const addLike = async (req, res) => {
  try {
    const { blogId, userId } = req.body;
    await Like.addLike(blogId, userId);
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

export const handleLikeEvent = async (io, data) => {
  const { blogId, userId, action } = data;

  try {
    if (action === "add") {
      await Like.addLike(blogId, userId);
    } else if (action === "remove") {
      await Like.removeLike(blogId, userId);
    }

    const updatedLikes = await Like.getLikesCount(blogId);

    // Broadcast the updated like count to all clients
    io.emit(`likeUpdate-${blogId}`, updatedLikes);
  } catch (error) {
    console.error("Error handling like event:", error);
  }
};