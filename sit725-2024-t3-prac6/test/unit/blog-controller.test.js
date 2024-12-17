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
        throw new Error("Database error");
      };

      await BlogController.getAllBlogs(req, res);
      expect(res.statusCode).to.equal(500);
      expect(res.data.error).to.equal("Database error");
    });
  });

  describe("createBlog", () => {
    it("should create a blog successfully", async () => {
      const blogData = { title: "New Blog", content: "New Content" };
      req.body = blogData;
      BlogService.createNewBlog = async (data) => data;

      await BlogController.createBlog(req, res);
      expect(res.data).to.deep.equal(blogData);
    });

    it("should handle errors when creating a blog", async () => {
      BlogService.createNewBlog = async () => {
        throw new Error("Creation error");
      };

      await BlogController.createBlog(req, res);
      expect(res.statusCode).to.equal(500);
      expect(res.data.error).to.equal("Creation error");
    });
  });
});
