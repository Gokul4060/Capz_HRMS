import TimeSheet from "../Models/timesheet.js"; 
import User from "../Models/userModel.js";
import { handleError } from "../utils/server.js"; 


export const createOrUpdateTimesheet = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;
    const {
      date,
      regularHours,
      overtimeHours,
      sickLeave,
      pto,
      paidHoliday,
      totalHours,
    } = req.body;

    
    let timesheet = await TimeSheet.findOne({ user: userId, date });

    if (timesheet) {

      timesheet.regularHours = regularHours || timesheet.regularHours;
      timesheet.overtimeHours = overtimeHours || timesheet.overtimeHours;
      timesheet.sickLeave = sickLeave || timesheet.sickLeave;
      timesheet.pto = pto || timesheet.pto;
      timesheet.paidHoliday = paidHoliday || timesheet.paidHoliday;
      timesheet.totalHours = totalHours || timesheet.totalHours;
    } else {
      // Create a new timesheet entry
      timesheet = new TimeSheet({
        user: userId,
        date,
        regularHours,
        overtimeHours,
        sickLeave,
        pto,
        paidHoliday,
        totalHours,
      });
    }

    await timesheet.save();
    res.status(201).json({
      status: true,
      message: "Timesheet saved successfully.",
      timesheet,
    });
  } catch (error) {
    handleError(error, res);
  }
};


export const getTimesheets = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;
    const { user: queryUserId, startDate, endDate } = req.query;

    const filter = {};
    if (!isAdmin) {
      filter.user = userId; 
    } else if (queryUserId) {
      filter.user = queryUserId; 
    }

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const timesheets = await TimeSheet.find(filter).populate(
      "user",
      "name email role"
    );
    res.status(200).json({
      status: true,
      message: "Timesheets fetched successfully",
      timesheets,
    });
  } catch (error) {
    handleError(error, res);
  }
};

// Approve timesheet (for admin/manager approval)
export const approveTimesheet = async (req, res) => {
  try {
    const { timesheetId } = req.params;
    const { userId } = req.user;

    const timesheet = await TimeSheet.findById(timesheetId);
    if (!timesheet) {
      return res
        .status(404)
        .json({ status: false, message: "Timesheet not found" });
    }

    timesheet.approvedBy = userId;
    timesheet.isApproved = true;

    await timesheet.save();
    res.status(200).json({
      status: true,
      message: "Timesheet approved successfully",
      timesheet,
    });
  } catch (error) {
    handleError(error, res);
  }
};

// Delete timesheet
export const deleteTimesheet = async (req, res) => {
  try {
    const { timesheetId } = req.params;
    await TimeSheet.findByIdAndDelete(timesheetId);
    res.status(200).json({
      status: true,
      message: "Timesheet deleted successfully",
    });
  } catch (error) {
    handleError(error, res);
  }
};
