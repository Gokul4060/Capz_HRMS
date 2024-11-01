import TimeEntry from "../Models/timeentryModel.js";
import { handleError } from "../middlewares/errorMiddlewaves.js";


export const startTimeEntry = async (req, res) => {
  try {
    const { userId } = req.user;
    const { taskId } = req.body;

    const timeEntry = await TimeEntry.create({
      user: userId,
      task: taskId,
      startTime: new Date(),
    });

    res
      .status(201)
      .json({ status: true, message: "Time entry started", timeEntry });
  } catch (error) {
    handleError(error, res);
  }
};


export const endTimeEntry = async (req, res) => {
  try {
    const { id } = req.params; 

    const timeEntry = await TimeEntry.findById(id);

    if (!timeEntry || timeEntry.endTime) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid time entry" });
    }

    timeEntry.endTime = new Date();
    timeEntry.duration =
      (timeEntry.endTime - timeEntry.startTime) / (1000 * 60); 
    await timeEntry.save();

    res
      .status(200)
      .json({ status: true, message: "Time entry ended", timeEntry });
  } catch (error) {
    handleError(error, res);
  }
};


export const getTimeTrackingData = async (req, res) => {
  try {
    const { userId } = req.user;

    const timeEntries = await TimeEntry.find({ user: userId }).populate("task");

    res.status(200).json({ status: true, timeEntries });
  } catch (error) {
    handleError(error, res);
  }
};
