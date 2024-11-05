import express from "express";
import {
  markAttendance,
  markClockOut,
  getUserAttendance,
  getAllAttendance,
  deleteAttendanceRecords,
  approveAttendance, // Import the new controller function
  rejectAttendance, // Import the new controller function
} from "../Controllers/attendanceController.js";

import {
  protectRoute,
  isAdminRoute,
  isAdminOrManagerRoute,
  isManagerRoute, // Import the middleware
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

// Route for admins to delete specific attendance records
router
  .route("/delete/:id")
  .delete(protectRoute, isAdminRoute, deleteAttendanceRecords);

// Route for admins or managers to approve attendance
router
  .route("/approve/:id")
  .put(protectRoute, isManagerRoute, approveAttendance);

// Route for admins or managers to reject attendance
router.route("/reject/:id").put(protectRoute, isManagerRoute, rejectAttendance);

export default router;
