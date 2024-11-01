import express from "express";
import userRoutes from "./userRoute.js";
import attendanceRoutes from "./attendanceRoute.js"
import leaveRoutes from "./leaveRoute.js"

//import timesheetRoutes from "./timesheetRoutes.js"

import ProjectRoute from "./projectRoute.js"

const router = express.Router();

router.use("/user", userRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/leave", leaveRoutes);
//router.use("/timesheets", timesheetRoutes);

router.use("/project", ProjectRoute);

export default router;
