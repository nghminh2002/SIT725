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
      };

      request.post(
        {
          url: baseUrl,
          json: true,
          body: blogData,
        },
        (error, response, body) => {
          expect(response.statusCode).to.equal(200);
          expect(body.title).to.equal(blogData.title);
          expect(body.content).to.equal(blogData.content);
          done();
        }
      );
    });
  });
});
