import express from "express";
import {
  startTimeEntry,
  endTimeEntry,
  getTimeTrackingData,
} from "../Controllers/timetrackingController.js";
import { protectRoute } from "../middlewares/authMiddlewave.js";

const router = express.Router();

router.post("/start", protectRoute, startTimeEntry);
router.post("/end/:id", protectRoute, endTimeEntry);
router.get("/", protectRoute, getTimeTrackingData);

export default router;
