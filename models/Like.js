import { db } from "../config/database.js";

const Like = {
  addLike: async (blogId, userId) => {
    await db.run(
      `INSERT INTO likes (blog_id, user_id) VALUES (?, ?)`,
      [blogId, userId]
    );
  },

  removeLike: async (blogId, userId) => {
    await db.run(
      `DELETE FROM likes WHERE blog_id = ? AND user_id = ?`,
      [blogId, userId]
    );
  },

  getLikesCount: async (blogId) => {
    const result = await db.get(
      `SELECT COUNT(*) AS count FROM likes WHERE blog_id = ?`,
      [blogId]
    );
    return result.count;
  },

  checkLikeStatus: async (blogId, userId) => {
    const result = await db.get(
      `SELECT COUNT(*) AS count FROM likes WHERE blog_id = ? AND user_id = ?`,
      [blogId, userId]
    );
    return result.count > 0; // Return true if the user has liked the blog
  },
};

export default Like;