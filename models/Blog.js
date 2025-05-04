import { db } from "../config/database.js";

const Blog = {
  create: async (title, description, country, date, image, likes, comments) => {
    const result = await db.run(
      `INSERT INTO blogs (title, description, country, date, image, likes, comments) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, description, country, date, image, likes, comments]
    );
    return { id: result.lastID, title, description, country, date, image, likes, comments };
  },

  getAll: async () => {
    const blogs = await db.all("SELECT * FROM blogs ORDER BY created_at DESC");
    return blogs;
  },

  getById: async (id) => {
    const blog = await db.get("SELECT * FROM blogs WHERE id = ?", [id]);
    return blog;
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