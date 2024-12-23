import { expect } from "chai";
import request from "request";

describe("Lucky Number Routes Integration Tests", () => {
  const port = process.env.PORT || 911;
  const baseUrl = `http://localhost:${port}/api/lucky-number`;

  describe("GET /api/lucky-number", () => {
    it("should return a lucky number response", (done) => {
      request.get(baseUrl, (error, response, body) => {
        const result = JSON.parse(body);
        expect(response.statusCode).to.equal(200);
        expect(result).to.have.property("number");
        expect(result).to.have.property("message");
        expect(result.statusCode).to.equal(200);
        expect(result.number).to.be.a("number");
        expect(result.number).to.be.within(1, 100);
        done();
      });
    });
  });
});
