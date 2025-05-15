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

export const getAllBlogsWithUserDetails = async (req, res) => {
  try {
    const blogs = await Blog.getAllWithUserDetails();
    res.json(blogs);
  } catch (error) {
    console.error("Failed to fetch blogs with user details:", error);
    res.status(500).json({ error: "Failed to fetch blogs with user details" });
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

export const getBlogByIdWithUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.getByIdWithUserDetails(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error("Failed to fetch blog with user details:", error);
    res.status(500).json({ error: "Failed to fetch blog with user details" });
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
    const { title, description, country, date, userId } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newBlog = await Blog.create(title, description, country, date, imageUrl, userId);

    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("Failed to create blog:", error);
    res.status(500).json({ error: "Failed to create blog" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, country, date } = req.body;
    // If a new image is uploaded, use its path; otherwise, keep the existing image
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    await Blog.update(id, title, description, country, date, imageUrl);
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

export const recalculateBlogCounts = async (req, res) => {
  try {
    await Blog.recalculateCounts();
    res.json({ message: "Blog counts recalculated successfully" });
  } catch (error) {
    console.error("Failed to recalculate blog counts:", error);
    res.status(500).json({ error: "Failed to recalculate blog counts" });
  }
};