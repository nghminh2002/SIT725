import express from "express";
import blogController from "../controllers/blog-controller.js";

const router = express.Router();

router.get("/", (req, res) => blogController.getAllBlogs(req, res));
router.post("/", (req, res) => blogController.createBlog(req, res));
router.get("/:id", (req, res) => blogController.getBlogById(req, res));
router.put("/:id", (req, res) => blogController.updateBlog(req, res));
router.delete("/:id", (req, res) => blogController.deleteBlog(req, res));
router.get("/category/:category", (req, res) =>
  blogController.getBlogsByCategory(req, res)
);

export default router;
