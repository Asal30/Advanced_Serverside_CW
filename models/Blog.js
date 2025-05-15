import { db } from "../config/database.js";

const Blog = {
  create: async (title, description, country, date, image, userId) => {
    try {
      const result = await db.run(
        `INSERT INTO blogs (title, description, country, date, image, user_id) 
       VALUES (?, ?, ?, ?, ?, ?)`,
        [title, description, country, date, image, userId]
      );
      return { id: result.lastID, title, description, country, date, image, userId, likes: 0, comments: 0 };
    } catch (err) {
      console.error('DB insert failed:', err.message);
      throw err;
    }
  },


  getAll: async () => {
    const blogs = await db.all("SELECT * FROM blogs ORDER BY created_at DESC");
    return blogs;
  },

  getAllWithUserDetails: async () => {
    const blogs = await db.all(`
      SELECT 
        blogs.*, 
        users.username AS user_name, 
        users.profile_image AS user_profile_image 
      FROM blogs
      JOIN users ON blogs.user_id = users.id
      ORDER BY blogs.created_at DESC
    `);
    return blogs;
  },

  getById: async (id) => {
    const blog = await db.get("SELECT * FROM blogs WHERE id = ?", [id]);
    return blog;
  },

  getByIdWithUserDetails: async (id) => {
    const blog = await db.get(`
      SELECT 
        blogs.*, 
        users.username AS user_name, 
        users.profile_image AS user_profile_image 
      FROM blogs
      JOIN users ON blogs.user_id = users.id
      WHERE blogs.id = ?
    `, [id]);
    return blog;
  },

  getByUserId: async (userId) => {
    const blogs = await db.all("SELECT * FROM blogs WHERE user_id = ? ORDER BY created_at DESC", [userId]);
    return blogs;
  },

  update: async (id, title, description, country, date, image) => {
    await db.run(
      `UPDATE blogs 
       SET title = ?, description = ?, country = ?, date = ?, image = ?
       WHERE id = ?`,
      [title, description, country, date, image, id]
    );
  },

  updateLikesCount: async (blogId) => {
    const result = await db.get(
      `SELECT COUNT(*) AS count FROM likes WHERE blog_id = ?`,
      [blogId]
    );
    await db.run(
      `UPDATE blogs SET likes = ? WHERE id = ?`,
      [result.count, blogId]
    );
  },

  updateCommentsCount: async (blogId) => {
    const result = await db.get(
      `SELECT COUNT(*) AS count FROM comments WHERE blog_id = ?`,
      [blogId]
    );
    await db.run(
      `UPDATE blogs SET comments = ? WHERE id = ?`,
      [result.count, blogId]
    );
  },

  recalculateCounts: async () => {
    const blogs = await db.all("SELECT id FROM blogs");

    for (const blog of blogs) {
      const likesResult = await db.get(
        `SELECT COUNT(*) AS count FROM likes WHERE blog_id = ?`,
        [blog.id]
      );

      const commentsResult = await db.get(
        `SELECT COUNT(*) AS count FROM comments WHERE blog_id = ?`,
        [blog.id]
      );

      await db.run(
        `UPDATE blogs SET likes = ?, comments = ? WHERE id = ?`,
        [likesResult.count, commentsResult.count, blog.id]
      );
    }
  },

  delete: async (id) => {
    await db.run("DELETE FROM blogs WHERE id = ?", [id]);
  },
};

export default Blog;