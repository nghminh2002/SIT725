const express = require("express");
const blogRoutes = require("./blog-route");
const luckyNumberRoutes = require("./lucky-number-route");

const router = express.Router();

router.use("/blogs", blogRoutes);
router.use("/lucky-number", luckyNumberRoutes);

module.exports = router;
