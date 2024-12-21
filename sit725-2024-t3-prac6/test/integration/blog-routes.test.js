import { expect } from "chai";
import request from "request";

describe("Blog Routes Integration Tests", () => {
  const port = process.env.PORT || 911;
  const baseUrl = `http://localhost:${port}/api/blogs`;

  describe("GET /api/blogs", () => {
    it("should get all blogs", (done) => {
      request.get(baseUrl, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(JSON.parse(body)).to.be.an("array");
        done();
      });
    });
  });

  describe("POST /api/blogs", () => {
    it("should create a new blog", (done) => {
      const blogData = {
        title: "Integration Test Blog",
        content: "Integration Test Content",
        author: "Test Author",
        category: "Technology",
      };

      request.post(
        {
          url: baseUrl,
          json: true,
          body: blogData,
        },
        (error, response, body) => {
          expect(response.statusCode).to.equal(201);
          expect(body.title).to.equal(blogData.title);
          done();
        }
      );
    });
  });

  describe("POST /api/blogs validation", () => {
    it("should reject blog with short title", (done) => {
      const blogData = {
        title: "ab",
        content: "Valid content",
        author: "John",
      };

      request.post(
        {
          url: baseUrl,
          json: true,
          body: blogData,
        },
        (error, response, body) => {
          expect(response.statusCode).to.equal(400);
          expect(body.error).to.include("title");
          done();
        }
      );
    });

    it("should reject blog with invalid category", (done) => {
      const blogData = {
        title: "Valid Title",
        content: "Valid content",
        author: "John",
        category: "InvalidCategory",
      };

      request.post(
        {
          url: baseUrl,
          json: true,
          body: blogData,
        },
        (error, response, body) => {
          expect(response.statusCode).to.equal(400);
          expect(body.error).to.include("category");
          done();
        }
      );
    });
  });
});
