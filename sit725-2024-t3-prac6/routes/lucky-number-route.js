const express = require("express");
const router = express.Router();
const luckyNumberController = require("../controllers/lucky-number-controller");

router.get("/", luckyNumberController.getLuckyNumber);

module.exports = router;
