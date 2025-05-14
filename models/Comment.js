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
    const comments = await db.all(`
      SELECT 
        comments.id,
        comments.comment,
        comments.created_at,
        users.username AS user_name,
        users.profile_image AS user_profile_image
      FROM comments
      JOIN users ON comments.user_id = users.id
      WHERE comments.blog_id = ?
      ORDER BY comments.created_at DESC
    `, [blogId]);
    return comments;
  },
};

export default Comment;