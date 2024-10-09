import express from "express";
import {
  createOrUpdateTimesheet,
  getTimesheets,
  approveTimesheet,
  deleteTimesheet,
} from "../Controllers/timeSheetController.js";
import {
  protectRoute,
  isAdminRoute,
  isAdminOrManagerRoute,
} from "../Middleware/authMiddleware.js"; 

const router = express.Router();

// Route to create or update a timesheet
router.post("/createOrUpdate", protectRoute, createOrUpdateTimesheet);

// Route to get timesheets (accessible by Admin, Manager, or specific users)
router.get("/getTimesheets", protectRoute, getTimesheets);

// Route to approve a timesheet (Admin or Manager only)
router.put(
  "/approve/:timesheetId",
  protectRoute,
  isAdminOrManagerRoute,
  approveTimesheet
);

// Route to delete a timesheet (Admin only)
router.delete(
  "/delete/:timesheetId",
  protectRoute,
  isAdminRoute,
  deleteTimesheet
);

export default router;
