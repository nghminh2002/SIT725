const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog-controller");
const luckyNumberController = require("../controllers/lucky-number-controller");

// Blog routes
router.get("/blogs", blogController.getAllBlogs);
router.post("/blogs", blogController.createBlog);

// Lucky number route
router.get("/lucky-number", luckyNumberController.getLuckyNumber);

module.exports = router;
