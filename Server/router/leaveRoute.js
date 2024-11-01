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
  isEmployeeRoute,
} from "../middlewares/authMiddlewave.js";

const router = express.Router();


router.post("/apply", protectRoute, applyLeave);
router.get("/getLeave", protectRoute, getUserleave);




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


router.get("/history", protectRoute, isAdminOrManagerRoute, getLeaveHistory);



router.delete("/leave/:id", protectRoute, isAdminOrManagerRoute, deleteLeaveRequest);


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



router.get("/admin/data", protectRoute, isAdminRoute, (req, res) => {
  res.status(200).json({ message: "Data accessible only by Admins." });
});


router.get("/manager/data", protectRoute, isManagerRoute, (req, res) => {
  res.status(200).json({ message: "Data accessible only by Managers." });
});


router.get("/developer/data", protectRoute, isEmployeeRoute, (req, res) => {
  res.status(200).json({ message: "Data accessible only by Employee." });
});

export default router;
