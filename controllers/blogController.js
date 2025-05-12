import Blog from "../models/Blog.js";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.getAll();
    res.json(blogs);
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.getById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};

export const getBlogsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const blogs = await Blog.getByUserId(userId);
    res.json(blogs);
  } catch (error) {
    console.error("Failed to fetch blogs by userId:", error);
    res.status(500).json({ error: "Failed to fetch blogs by userId" });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, description, country, date, image, likes = 0, comments = 0, userId } = req.body;
    const newBlog = await Blog.create(title, description, country, date, image, likes, comments, userId);
    res.status(201).json(newBlog);
  } catch (error) {
    console.error("Failed to create blog:", error);
    res.status(500).json({ error: "Failed to create blog" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, country, date, image, likes, comments } = req.body;
    await Blog.update(id, title, description, country, date, image, likes, comments);
    res.json({ message: "Blog updated successfully" });
  } catch (error) {
    console.error("Failed to update blog:", error);
    res.status(500).json({ error: "Failed to update blog" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.delete(id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Failed to delete blog:", error);
    res.status(500).json({ error: "Failed to delete blog" });
  }
};