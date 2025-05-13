import { db } from "../config/database.js";

const Comment = {
  addComment: async (blogId, userId, comment) => {
    const result = await db.run(
      `INSERT INTO comments (blog_id, user_id, comment) VALUES (?, ?, ?)`,
      [blogId, userId, comment]
    );
    return { id: result.lastID, blogId, userId, comment };
  },

  getCommentsByBlogId: async (blogId) => {
    const comments = await db.all(
      `SELECT * FROM comments WHERE blog_id = ? ORDER BY created_at DESC`,
      [blogId]
    );
    return comments;
  },
};

export default Comment;