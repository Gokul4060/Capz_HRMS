import Leave from "../Models/leaveModel.js";
import User from "../Models/userModel.js";

const handleError = (error, res) => {
  console.error(error);
  res.status(400).json({ status: false, message: error.message });
};

export const applyLeave = async (req, res) => {
  try {
    const { userId } = req.user;
    const { startDate, endDate, leaveType, reason, leaveBalance, approver } =
      req.body;

    // Fetch the user to check their leave balance
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    // Calculate the number of leave days requested
    const leaveDays = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1
    ); // Add 1 to include the end date

    // Check if the leave balance is sufficient
    if (user.leaveBalance < leaveDays) {
      return res
        .status(400)
        .json({ status: false, message: "Insufficient leave balance" });
    }

    // Create the leave request
    const newLeave = await Leave.create({
      user: userId,
      startDate,
      endDate,
      leaveType,
      approver,
      reason,
      leaveBalance: leaveDays, // Store the number of days applied
      status: "Pending",
    });

    // Deduct the applied leave from user's leave balance
    user.leaveBalance -= leaveDays;
    user.leavesPending += leaveDays; // Add the days to pending if you're tracking that separately
    await user.save();

    res.status(201).json({
      status: true,
      message: "Leave application submitted successfully",
      leave: newLeave,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getUserleave = async (req, res) => {
  try {
    const { userId } = req.user;

    // Fetch leave records and populate the approver field with the approver's name
    const leaveRecords = await Leave.find({ user: userId }).populate(
      "approver",
      "name role"
    );

    if (!leaveRecords || leaveRecords.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No leave records found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Leave records fetched successfully",
      leaveRecords, // return the records
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};



export const getPendingLeaveRequests = async (req, res) => {
  try {
    // Assuming the manager is authenticated and has a `role` field in the `user` object
    if (req.user.role !== "Manager") {
      return res.status(403).json({ status: false, message: "Access denied." });
    }

    // Fetch all pending leave requests
    const leaveRequests = await Leave.find({ status: "Pending" }).populate(
      "user",
      "name email"
    );

    if (!leaveRequests || leaveRequests.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "No pending leave requests found." });
    }

    res.status(200).json({
      status: true,
      message: "Pending leave requests fetched successfully",
      leaveRequests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const updateLeaveStatus = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const { status } = req.body; // status can be "Approved" or "Rejected"

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ status: false, message: "Invalid status" });
    }

    const leave = await Leave.findById(leaveId);
    if (!leave) {
      return res
        .status(404)
        .json({ status: false, message: "Leave not found" });
    }

    // Update the status of the leave request
    leave.status = status;
    await leave.save();

    res.status(200).json({
      status: true,
      message: `Leave request has been ${status.toLowerCase()}.`,
      leave,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const getLeaveHistory = async (req, res) => {
  try {
    // Fetch all leave requests with status "Approved" or "Rejected"
    const leaveHistory = await Leave.find({
      status: { $in: ["Approved", "Rejected"] },
    }).populate("user", "name email");

    if (!leaveHistory || leaveHistory.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No approved or rejected leave requests found.",
      });
    }

    res.status(200).json({
      status: true,
      message: "Leave history fetched successfully",
      leaveHistory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};





{/*export const getLeaveRequests = async (req, res) => {
  try {
    const { userId, isAdmin, isManager } = req.user;

    let query = { user: userId };
    if (isAdmin || isManager) {
      query = {}; // Admins and Managers can see all leave requests
    }

    const leaves = await Leave.find(query)
      .populate("user", "name email")
      .populate("approver", "name");

    res.status(200).json({
      status: true,
      message: "Leave requests fetched successfully",
      leaves,
    });
  } catch (error) {
    handleError(error, res);
  }
}; */}

export const updateLeaveRequest = async (req, res) => {
  try {
    const { id } = req.params; // Get the leave request ID from the URL
    const { startDate, endDate, leaveType, status } = req.body; // Get data from the request body

    // Find the leave request by ID
    const leave = await Leave.findById(id);

    // Check if the leave request exists
    if (!leave) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    // Update fields if they are provided in the request
    if (startDate) leave.startDate = startDate;
    if (endDate) leave.endDate = endDate;
    if (leaveType) leave.leaveType = leaveType;
    if (status) leave.status = status;

    // Save the updated leave request
    const updatedLeave = await leave.save();

    // Return the updated leave request
    res.status(200).json({
      message: "Leave request updated successfully",
      leave: updatedLeave,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




export const deleteLeaveRequest = async (req, res) => {
  try {
    const leaveId = req.params.id; // Get leave ID from URL parameters
    console.log(`Attempting to delete leave request with ID: ${leaveId}`); // Log the ID

    if (!leaveId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid leave ID" });
    }

    // Fetch the leave record by ID
    const leave = await Leave.findById(leaveId);

    // Check if the leave record exists
    if (!leave) {
      console.log(`Leave request with ID ${leaveId} not found.`);
      return res
        .status(404)
        .json({ success: false, message: "Leave request not found" });
    }

    // Optional: Refund the leave balance if leave is not yet approved
    if (leave.status === "Pending") {
      const user = await User.findById(leave.user);
      if (user) {
        user.leaveBalance += leave.leaveBalance; // Add back the leave days
        await user.save();
      }
    }

    // Use `findByIdAndDelete` to delete the leave record
    await Leave.findByIdAndDelete(leaveId);

    res
      .status(200)
      .json({ success: true, message: "Leave request deleted successfully" });
  } catch (error) {
    console.error(`Error deleting leave request: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUserLeaveBalance = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    res.status(200).json({
      status: true,
      message: "Leave balance fetched successfully",
      leaveBalance: user.leaveBalance, // this is the leave balance from the user document
      leavesTaken: user.leavesTaken, // total leaves the user has already taken
      leavesPending: user.leavesPending, // pending leave requests
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};
export const getAllLeaves = async (req, res) => {
  try {
    // Check if the user has the admin role
    if (req.user.role !== "Admin") {
      return res
        .status(403)
        .json({
          status: false,
          message: "Access denied. Only admins can view all leave requests.",
        });
    }

    // Fetch all leave records and populate user and approver details
    const allLeaves = await Leave.find({})
      .populate("user", "name email") // Populate user name and email
      .populate("approver", "name role"); // Populate approver name and role

    if (!allLeaves || allLeaves.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "No leave records found." });
    }

    res.status(200).json({
      status: true,
      message: "All leave requests fetched successfully",
      leaves: allLeaves,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

