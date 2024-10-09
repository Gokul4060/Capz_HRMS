import Task from "../Models/taskModel.js";
import Timesheet from "../Models/timesheet.js";
import { handleError } from "../middlewares/errorMiddlewaves.js";

// Create Task
export const createTask = async (req, res) => {
  try {
    const { userId } = req.user;
    const { title, description, startTime, endTime } = req.body;

    const timesheet = await Timesheet.findOne({
      user: userId,
      date: new Date().toDateString(),
    });

    if (!timesheet) {
      return res
        .status(400)
        .json({ status: false, message: "No timesheet found for today" });
    }

    const task = await Task.create({
      user: userId,
      timesheet: timesheet._id,
      title,
      description,
      startTime,
      endTime,
      duration: (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60),
    });

    timesheet.tasks.push(task._id);
    await timesheet.save();

    res
      .status(201)
      .json({ status: true, message: "Task created successfully", task });
  } catch (error) {
    handleError(error, res);
  }
};

// Get Tasks Timeline
export const getTasksTimeline = async (req, res) => {
  try {
    const { userId } = req.user;

    const tasks = await Task.find({ user: userId });

    res.status(200).json({ status: true, tasks });
  } catch (error) {
    handleError(error, res);
  }
};
