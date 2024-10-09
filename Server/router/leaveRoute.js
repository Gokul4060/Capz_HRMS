import express from "express";
import {
  applyLeave,
  updateLeaveStatus,
  getUserleave,
  deleteLeaveRequest,
  getUserLeaveBalance,
  getPendingLeaveRequests,
  getLeaveHistory,
  updateLeaveRequest,
  getAllLeaves,
} from "../Controllers/leaveController.js";
import {
  protectRoute,
  isAdminRoute,
  isAdminOrManagerRoute,
  isManagerRoute,
  isDeveloperRoute,
} from "../middlewares/authMiddlewave.js";

const router = express.Router();

// Apply for leave - accessible by any authenticated user
router.post("/apply", protectRoute, applyLeave);
router.get("/getLeave", protectRoute, getUserleave);



// Update leave status - accessible only by Admins or Managers
router.patch(
  "/update/:leaveId",
  protectRoute,
  isAdminOrManagerRoute,
  updateLeaveStatus
);
router.patch(
  "/update/:id",
  protectRoute,
  isAdminOrManagerRoute,
  updateLeaveRequest
);
// Get all leave requests - accessible by Admins or Managers, others see only their requests
//router.get("/requests", protectRoute, getLeaveRequests);

router.get("/history", protectRoute, isAdminOrManagerRoute, getLeaveHistory);


// Delete a leave request - accessible by Admins or the request owner
router.delete("/leave/:id", protectRoute, isAdminOrManagerRoute, deleteLeaveRequest);

// Get user's leave balance - accessible by any authenticated user
router.get("/balance", protectRoute, getUserLeaveBalance);

router.get("/all", protectRoute, isAdminRoute, getAllLeaves);

router.patch(
  "/update-status/:leaveId",
  protectRoute,
  isManagerRoute,
  updateLeaveStatus
);


router.get(
  "/pending-requests",
  protectRoute,
  isManagerRoute,
  getPendingLeaveRequests
);


// Additional Routes showing usage of specific role-based middleware
// Route only for Admins
router.get("/admin/data", protectRoute, isAdminRoute, (req, res) => {
  res.status(200).json({ message: "Data accessible only by Admins." });
});

// Route only for Managers
router.get("/manager/data", protectRoute, isManagerRoute, (req, res) => {
  res.status(200).json({ message: "Data accessible only by Managers." });
});

// Route only for Developers
router.get("/developer/data", protectRoute, isDeveloperRoute, (req, res) => {
  res.status(200).json({ message: "Data accessible only by Developers." });
});

export default router;
