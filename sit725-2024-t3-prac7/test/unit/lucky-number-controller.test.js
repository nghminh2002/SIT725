import { expect } from "chai";
import LuckyNumberController from "../../controllers/lucky-number-controller.js";

describe("LuckyNumberController Unit Tests", () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      json: function (data) {
        this.data = data;
        return this;
      },
    };
  });

  it("should return a number between 1 and 100", () => {
    LuckyNumberController.getLuckyNumber(req, res);

    expect(res.data.statusCode).to.equal(200);
    expect(res.data.number).to.be.a("number");
    expect(res.data.number).to.be.within(1, 100);
  });

  it("should return appropriate message for very lucky numbers", () => {
    Math.random = () => 0.9;

    LuckyNumberController.getLuckyNumber(req, res);
    expect(res.data.message).to.equal("Wow! That's a very lucky number!");
  });

  it("should return appropriate message for unlucky numbers", () => {
    Math.random = () => 0.1;

    LuckyNumberController.getLuckyNumber(req, res);
    expect(res.data.message).to.equal("Don't worry, tomorrow will be better!");
  });
});
