import express from "express";
import blogRoutes from "./blog-route.js";
import luckyNumberRoutes from "./lucky-number-route.js";

const router = express.Router();

router.use("/blogs", blogRoutes);
router.use("/lucky-number", luckyNumberRoutes);

export default router;
