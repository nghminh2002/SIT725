const Blog = require("../models/blog-model");

class BlogController {
  async getAllBlogs(req, res) {
    try {
      const allBlogs = await Blog.find();
      res.json(allBlogs);
    } catch (error) {
      res.status(500).json({ error: "Error fetching blogs" });
    }
  }

  async createBlog(req, res) {
    try {
      const { title, content } = req.body;
      const newBlog = new Blog({
        title,
        content,
        date: new Date().toLocaleDateString(),
      });
      const savedBlog = await newBlog.save();
      res.json(savedBlog);
    } catch (error) {
      res.status(500).json({ error: "Error creating blog" });
    }
  }
}

module.exports = new BlogController();
