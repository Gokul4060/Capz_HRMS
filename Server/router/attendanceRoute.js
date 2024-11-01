import express from "express";
import {
  markAttendance,
  markClockOut,
  getUserAttendance,
  getAllAttendance,
  deleteAttendanceRecords,
} from "../Controllers/attendanceController.js";

import {
  protectRoute,
  isAdminRoute,

  isAdminOrManagerRoute, // Import the new middleware
} from "../middlewares/authMiddlewave.js";

const router = express.Router();

// Route for users to mark attendance
router.route("/mark").post(protectRoute, markAttendance);

// Route to get attendance records for the logged-in user
router.route("/user").get(protectRoute, getUserAttendance);

// Route for users to clock out
router.route("/clockout").put(protectRoute, markClockOut);

// Route for admins and managers to view attendance for all users
router.route("/all").get(protectRoute, isAdminOrManagerRoute, getAllAttendance);



router
  .route("/delete/:id")
  .delete(protectRoute, isAdminRoute, deleteAttendanceRecords); 

export default router;

