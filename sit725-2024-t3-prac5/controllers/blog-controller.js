const BlogService = require("../services/blog-service");

class BlogController {
  async getAllBlogs(req, res) {
    try {
      const allBlogs = await BlogService.findAllBlogs();
      res.json(allBlogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createBlog(req, res) {
    try {
      const { title, content } = req.body;
      const blogData = { title, content };
      const savedBlog = await BlogService.createNewBlog(blogData);
      res.json(savedBlog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new BlogController();
