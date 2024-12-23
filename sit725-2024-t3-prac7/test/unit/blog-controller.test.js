import { expect } from "chai";
import BlogController from "../../controllers/blog-controller.js";
import BlogService from "../../services/blog-service.js";

describe("BlogController Unit Tests", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      json: function (data) {
        this.data = data;
        return this;
      },
      status: function (code) {
        this.statusCode = code;
        return this;
      },
    };
  });

  describe("getAllBlogs", () => {
    it("should return all blogs successfully", async () => {
      const mockBlogs = [{ title: "Test Blog", content: "Test Content" }];
      BlogService.findAllBlogs = async () => mockBlogs;

      await BlogController.getAllBlogs(req, res);
      expect(res.data).to.deep.equal(mockBlogs);
    });

    it("should handle errors when getting all blogs", async () => {
      BlogService.findAllBlogs = async () => {
        throw new Error("Internal server error");
      };

      await BlogController.getAllBlogs(req, res);
      expect(res.statusCode).to.equal(500);
      expect(res.data.error).to.equal("Internal server error");
    });
  });

  describe("createBlog", () => {
    it("should create a blog successfully", async () => {
      const blogData = {
        title: "New Blog",
        content: "New Content",
        author: "Milly",
      };
      req.body = blogData;
      BlogService.createNewBlog = async (data) => data;

      await BlogController.createBlog(req, res);
      expect(res.data).to.deep.equal(blogData);
    });
  });

  describe("validateData", () => {
    it("should validate title length", async () => {
      req.body = { title: "ab", content: "Valid content", author: "Milly" };
      await BlogController.createBlog(req, res);
      expect(res.statusCode).to.equal(400);
      expect(res.data.error).to.include("Title");
    });

    it("should validate content minimum length", async () => {
      req.body = { title: "Valid Title", content: "Short", author: "Milly" };
      await BlogController.createBlog(req, res);
      expect(res.statusCode).to.equal(400);
      expect(res.data.error).to.include("Content");
    });

    it("should validate required author field", async () => {
      req.body = { title: "Valid Title", content: "Valid content" };
      await BlogController.createBlog(req, res);
      expect(res.statusCode).to.equal(400);
      expect(res.data.error).to.include("Author");
    });

    it("should validate category enum values", async () => {
      req.body = {
        title: "Valid Title",
        content: "Valid content",
        author: "John",
        category: "Invalid Category",
      };
      await BlogController.createBlog(req, res);
      expect(res.statusCode).to.equal(400);
      expect(res.data.error).to.include("category");
    });
  });

  describe("getBlogById", () => {
    it("should get blog by valid ID", async () => {
      const mockBlog = { id: "validId", title: "Test Blog" };
      BlogService.findBlogById = async () => mockBlog;

      req.params = { id: "validId" };
      await BlogController.getBlogById(req, res);
      expect(res.data).to.deep.equal(mockBlog);
    });

    it("should handle non-existent blog ID", async () => {
      BlogService.findBlogById = async () => null;

      req.params = { id: "validButNonexistentId" };
      await BlogController.getBlogById(req, res);
      expect(res.statusCode).to.equal(404);
      expect(res.data.error).to.include("Blog not found");
    });

    it("should update blog successfully", async () => {
      const updateData = {
        title: "Updated Title",
        content: "Updated content",
        author: "John",
      };
      req.params = { id: "validId" };
      req.body = updateData;

      BlogService.updateBlog = async () => ({ ...updateData, id: "validId" });
      await BlogController.updateBlog(req, res);
      expect(res.data.title).to.equal(updateData.title);
    });

    it("should delete blog successfully", async () => {
      req.params = { id: "validId" };
      BlogService.deleteBlog = async () => ({ id: "validId" });

      await BlogController.deleteBlog(req, res);
      expect(res.statusCode).to.equal(200);
    });
  });

  describe("updateBlogById", () => {
    it("should update blog successfully", async () => {
      const updateData = {
        title: "Updated Title",
        content: "Updated content",
        author: "John",
      };
      req.params = { id: "validId" };
      req.body = updateData;

      BlogService.updateBlog = async () => ({ ...updateData, id: "validId" });
      await BlogController.updateBlog(req, res);
      expect(res.data.title).to.equal(updateData.title);
    });
  });

  describe("deleteBlogById", () => {
    it("should delete blog successfully", async () => {
      req.params = { id: "validId" };
      BlogService.deleteBlog = async () => ({ id: "validId" });

      await BlogController.deleteBlog(req, res);
      expect(res.statusCode).to.equal(200);
    });
  });

  describe("categoryOperations", () => {
    it("should get blogs by category", async () => {
      const mockBlogs = [
        { title: "Tech Blog 1", category: "Technology" },
        { title: "Tech Blog 2", category: "Technology" },
      ];
      BlogService.findBlogsByCategory = async () => mockBlogs;

      req.params = { category: "Technology" };
      await BlogController.getBlogsByCategory(req, res);
      expect(res.data).to.have.lengthOf(2);
    });

    it("should handle empty category results", async () => {
      BlogService.findBlogsByCategory = async () => [];

      req.params = { category: "Technology" };
      await BlogController.getBlogsByCategory(req, res);
      expect(res.data).to.have.lengthOf(0);
    });
  });

  describe("handlePublishStatus", () => {
    it("should toggle blog publish status", async () => {
      const mockBlog = { id: "validId", isPublished: false };
      BlogService.togglePublishStatus = async () => ({
        ...mockBlog,
        isPublished: true,
      });

      req.params = { id: "validId" };
      await BlogController.togglePublishStatus(req, res);
      expect(res.data.isPublished).to.be.true;
    });
  });
});
