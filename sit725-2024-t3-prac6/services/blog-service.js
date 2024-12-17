import Blog from "../models/blog-model.js";

class BlogService {
  async findAllBlogs() {
    try {
      return await Blog.find();
    } catch (error) {
      throw new Error("Error fetching blogs");
    }
  }

  async createNewBlog(blogData) {
    try {
      const newBlog = new Blog({
        title: blogData.title,
        content: blogData.content,
        date: new Date().toLocaleDateString(),
      });
      return await newBlog.save();
    } catch (error) {
      throw new Error("Error creating blog");
    }
  }
}

export default new BlogService();
