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
      const newBlog = new Blog(blogData);
      return await newBlog.save();
    } catch (error) {
      if (error.name === "ValidationError") {
        throw error;
      }
      throw new Error("Error creating blog: " + error.message);
    }
  }

  async findBlogById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid blog ID");
      }
      const blog = await Blog.findById(id);
      if (!blog) {
        throw new Error("Blog not found");
      }
      return blog;
    } catch (error) {
      throw error;
    }
  }

  async updateBlog(id, blogData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid blog ID");
    }
    return await Blog.findByIdAndUpdate(id, blogData, { new: true });
  }

  async deleteBlog(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid blog ID");
    }
    return await Blog.findByIdAndDelete(id);
  }

  async findBlogsByCategory(category) {
    try {
      return (await Blog.find({ category })) || [];
    } catch (error) {
      throw new Error("Error fetching blogs by category");
    }
  }

  async togglePublishStatus(id) {
    const blog = await this.findBlogById(id);
    blog.isPublished = !blog.isPublished;
    return await blog.save();
  }

  validateBlogData(data) {
    const errors = [];

    if (!data.title || data.title.length < 3) {
      errors.push("title: Title must be at least 3 characters long");
    }

    if (!data.content || data.content.length < 10) {
      errors.push("content: Content must be at least 10 characters long");
    }

    if (!data.author) {
      errors.push("author: Author is required");
    }

    if (data.category && !this.isValidCategory(data.category)) {
      errors.push("category: Invalid category");
    }

    if (errors.length > 0) {
      const error = new Error(errors.join(", "));
      error.name = "ValidationError";
      throw error;
    }

    return data;
  }
  isValidCategory(category) {
    const validCategories = [
      "Technology",
      "Lifestyle",
      "Travel",
      "Food",
      "Other",
    ];
    return validCategories.includes(category);
  }
}

export default new BlogService();
