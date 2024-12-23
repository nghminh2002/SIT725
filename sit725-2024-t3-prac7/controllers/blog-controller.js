import BlogService from "../services/blog-service.js";

class BlogController {
  async getAllBlogs(req, res) {
    try {
      const allBlogs = await BlogService.findAllBlogs();
      res.json(allBlogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getBlogById(req, res) {
    try {
      const { id } = req.params;
      const blog = await BlogService.findBlogById(id);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.status(200).json(blog);
    } catch (error) {
      if (error.message === "Invalid blog ID") {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async createBlog(req, res) {
    try {
      const blogData = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
      };

      if (req.body.category) {
        blogData.category = req.body.category;
      }

      if (req.body.tags) {
        blogData.category = req.body.tags;
      }

      if (!blogData.title || blogData.title.length < 3) {
        return res
          .status(400)
          .json({ error: "Title must be at least 3 characters long" });
      }
      if (!blogData.content || blogData.content.length < 10) {
        return res
          .status(400)
          .json({ error: "Content must be at least 10 characters long" });
      }
      if (!blogData.author) {
        return res.status(400).json({ error: "Author is required" });
      }

      if (blogData.category) {
        const blogData = BlogService.validateBlogData(req.body);
      }

      const savedBlog = await BlogService.createNewBlog(blogData);
      res.status(201).json(savedBlog);
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateBlog(req, res) {
    try {
      const { id } = req.params;
      const blogData = BlogService.validateBlogData(req.body);
      const updatedBlog = await BlogService.updateBlog(id, blogData);
      if (!updatedBlog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.json(updatedBlog);
    } catch (error) {
      if (error.message === "Invalid blog ID") {
        res.status(400).json({ error: error.message });
      } else if (error.name === "ValidationError") {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async deleteBlog(req, res) {
    try {
      const { id } = req.params;
      const deletedBlog = await BlogService.deleteBlog(id);
      if (!deletedBlog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
      if (error.message === "Invalid blog ID") {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async getBlogsByCategory(req, res) {
    try {
      const { category } = req.params;
      if (!BlogService.isValidCategory(category)) {
        return res.status(400).json({ error: "Invalid category" });
      }
      const blogs = await BlogService.findBlogsByCategory(category);
      return res.status(200).json(blogs);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async togglePublishStatus(req, res) {
    try {
      const { id } = req.params;
      const updatedBlog = await BlogService.togglePublishStatus(id);
      res.json(updatedBlog);
    } catch (error) {
      if (
        error.message === "Invalid blog ID" ||
        error.message === "Blog not found"
      ) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async getPublishedBlogs(req, res) {
    try {
      const publishedBlogs = await BlogService.findPublishedBlogs();
      res.json(publishedBlogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async searchBlogs(req, res) {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ error: "Search query is required" });
      }
      const blogs = await BlogService.searchBlogs(query);
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new BlogController();
