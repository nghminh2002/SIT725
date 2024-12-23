import express from "express";
import luckyNumberController from "../controllers/lucky-number-controller.js";

const router = express.Router();
router.get("/", luckyNumberController.getLuckyNumber);

export default router;
