import Attendance from "../models/attendanceModel.js";
import moment from "moment";


export const markAttendance = async (req, res) => {
  try {
    const { userId } = req.user;

    const today = moment().startOf("day").toDate(); 
    const attendance = await Attendance.findOne({
      user: userId,
      date: today,
    });

   
    if (attendance) {
      return res.status(400).json({
        status: false,
        message: "Attendance already marked for today.",
      });
    }

    // Create a new attendance record
    const newAttendance = await Attendance.create({
      user: userId,
      date: today,
      clockIn: moment().toDate(),
    });

    return res.status(201).json({
      status: true,
      message: "Attendance marked successfully",
      attendance: newAttendance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

// Mark clock out
// Mark clock out
export const markClockOut = async (req, res) => {
  try {
    const { userId } = req.user;
    const today = moment().startOf("day").toDate(); // Get today's date at midnight

    const attendance = await Attendance.findOne({
      user: userId,
      date: today,
    });

    if (!attendance) {
      return res.status(400).json({
        status: false,
        message:
          "No attendance record found for today. Please mark attendance first.",
      });
    }

    if (attendance.clockOut) {
      return res.status(400).json({
        status: false,
        message: "You have already clocked out for today.",
      });
    }

    // Mark clock out
    attendance.clockOut = moment().toDate();

    // Calculate total working hours (9 AM to 6 PM)
    const startOfWorkingHours = moment().set({ hour: 9, minute: 0, second: 0 });
    const endOfWorkingHours = moment().set({ hour: 18, minute: 0, second: 0 });

    const clockInTime = moment(attendance.clockIn);
    const clockOutTime = moment(attendance.clockOut);

    // If clock-out time is after 6 PM, set to 6 PM
    const totalWorkHours = moment
      .min(clockOutTime, endOfWorkingHours)
      .diff(moment.max(clockInTime, startOfWorkingHours), "hours", true);

    attendance.totalWorkHours = totalWorkHours;
    await attendance.save();

    return res.status(200).json({
      status: true,
      message: "Clocked out successfully",
      totalWorkHours,
      attendance,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error" });
  }
};


// Get attendance records for a user (getUserAttendance)
export const getUserAttendance = async (req, res) => {
  try {
    const { userId } = req.user;

    // Fetch attendance records for the logged-in user
    const attendanceRecords = await Attendance.find({ user: userId });

    if (!attendanceRecords || attendanceRecords.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No attendance records found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Attendance records fetched successfully",
      attendanceRecords, // return the records
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};


// Get all attendance records (Admin/Manager access)
export const getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find().populate(
      "user",
      "name email role"
    );

    if (!attendanceRecords || attendanceRecords.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No attendance records found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "All attendance records fetched successfully",
      attendanceRecords,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

// Update an attendance record (Admin only)
export const updateAttendance = async (req, res) => {
  try {
    const { attendanceId, clockIn, clockOut, status } = req.body;

    // Find the attendance record by its ID
    const attendance = await Attendance.findById(attendanceId);

    if (!attendance) {
      return res.status(404).json({
        status: false,
        message: 'Attendance record not found',
      });
    }

    // Update clockIn if provided
    if (clockIn) {
      attendance.clockIn = moment(clockIn).toDate();
    }

    // Update clockOut if provided
    if (clockOut) {
      attendance.clockOut = moment(clockOut).toDate();

      // Calculate total working hours (9 AM to 6 PM) if clockOut is updated
      const startOfWorkingHours = moment().set({ hour: 9, minute: 0, second: 0 });
      const endOfWorkingHours = moment().set({ hour: 18, minute: 0, second: 0 });

      const clockInTime = moment(attendance.clockIn);
      const clockOutTime = moment(attendance.clockOut);

      // If clock-out time is after 6 PM, set it to 6 PM
      const totalWorkHours = moment.min(clockOutTime, endOfWorkingHours).diff(
        moment.max(clockInTime, startOfWorkingHours),
        'hours',
        true
      );

      attendance.totalWorkHours = totalWorkHours;
    }

    // Update status if provided
    if (status) {
      attendance.status = status;
    }

    // Save updated attendance
    await attendance.save();

    return res.status(200).json({
      status: true,
      message: 'Attendance record updated successfully',
      attendance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Server error',
    });
  }
};

// Delete attendance records within a date range (Admin only)
export const deleteAttendanceRecords = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Ensure both startDate and endDate are provided
    if (!startDate || !endDate) {
      return res.status(400).json({
        status: false,
        message: 'Please provide both startDate and endDate.',
      });
    }

    // Parse the startDate and endDate into moment objects
    const start = moment(startDate).startOf('day').toDate();
    const end = moment(endDate).endOf('day').toDate();

    // Find and delete all attendance records between startDate and endDate
    const deletedRecords = await Attendance.deleteMany({
      date: {
        $gte: start,
        $lte: end,
      },
    });

    if (deletedRecords.deletedCount === 0) {
      return res.status(404).json({
        status: false,
        message: 'No attendance records found within the provided date range.',
      });
    }

    return res.status(200).json({
      status: true,
      message: `${deletedRecords.deletedCount} attendance records deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Server error' });
  }
};
