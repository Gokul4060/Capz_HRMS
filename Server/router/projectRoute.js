import express from "express";
import {
  createTask, // Now creating a task under a project
  createProject, // Create a new project
  dashboardStatistics, // Dashboard stats for projects
  deleteRestoreProject, // Restore or delete project
  duplicateProject, // Duplicate a project
  getProject, // Get details of a single project
  getProjects, // Get all projects
  postProjectActivity, 
  trashProject, 
  updateProject, 
} from "../Controllers/projectController.js"; // Update the controller paths as needed
import { isAdminRoute, protectRoute, isAdminOrManagerRoute } from "../middlewares/authMiddlewave.js";

const router = express.Router();

// Project routes
router.post("/create", protectRoute, isAdminRoute, createProject); // Create a project
router.post("/duplicate/:id", protectRoute, isAdminOrManagerRoute, duplicateProject); // Duplicate a project
router.post("/activity/:id", protectRoute, postProjectActivity); // Post activity in a project

router.get("/dashboard", protectRoute, dashboardStatistics); // Get dashboard stats
router.get("/", protectRoute, getProjects); // Get all projects
router.get("/:id", protectRoute, getProject); // Get a single project by ID

// Task routes within a project
router.post("/create-task/:id", protectRoute, isAdminOrManagerRoute, createTask); // Create task under a project
router.put("/update/:id", protectRoute, isAdminRoute, updateProject); // Update a project
router.put("/:id", protectRoute, isAdminRoute, trashProject); // Trash a project

router.delete(
  "/delete-restore/:id?",
  protectRoute,
  isAdminRoute,
  deleteRestoreProject // Delete or restore a project
);

export default router;
