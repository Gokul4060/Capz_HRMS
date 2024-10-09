import express from "express";
import { createTask, getTasksTimeline } from "../Controllers/taskController.js";
import { protectRoute } from "../middlewares/authMiddlewave.js";

const router = express.Router();

router.post("/create", protectRoute, createTask);
router.get("/gettimeline", protectRoute, getTasksTimeline);

export default router;
