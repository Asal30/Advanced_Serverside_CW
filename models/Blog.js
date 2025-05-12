import { db } from "../config/database.js";

const Blog = {
  create: async (title, description, country, date, image, likes, comments, userId) => {
    const result = await db.run(
      `INSERT INTO blogs (title, description, country, date, image, likes, comments, user_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, country, date, image, likes, comments, userId]
    );
    return { id: result.lastID, title, description, country, date, image, likes, comments, userId };
  },

  getAll: async () => {
    const blogs = await db.all("SELECT * FROM blogs ORDER BY created_at DESC");
    return blogs;
  },

  getById: async (id) => {
    const blog = await db.get("SELECT * FROM blogs WHERE id = ?", [id]);
    return blog;
  },

  getByUserId: async (userId) => {
    const blogs = await db.all("SELECT * FROM blogs WHERE user_id = ? ORDER BY created_at DESC", [userId]);
    return blogs;
  },

  update: async (id, title, description, country, date, image, likes, comments) => {
    await db.run(
      `UPDATE blogs 
       SET title = ?, description = ?, country = ?, date = ?, image = ?, likes = ?, comments = ? 
       WHERE id = ?`,
      [title, description, country, date, image, likes, comments, id]
    );
  },

  delete: async (id) => {
    await db.run("DELETE FROM blogs WHERE id = ?", [id]);
  },
};

export default Blog;