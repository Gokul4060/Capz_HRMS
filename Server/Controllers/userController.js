import User from "../Models/userModel.js";
import { createJWT } from "../utils/server.js";

const handleError = (error, res) => {
  console.error(error);
  res.status(400).json({ status: false, message: error.message });
};

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      isAdmin,
      isManager,
      isEmployee,
      role,
      title,
      employeeID,
      reportingManager,
    } = req.body;

    if (await User.findOne({ $or: [{ email }, { employeeID }] })) {
      return res.status(400).json({
        status: false,
        message: "User with this email or Employee ID already exists",
      });
    }

    let manager = null;
    if (role === "Employee" && reportingManager) {
      manager = await User.findById(reportingManager);
      if (!manager) {
        return res.status(400).json({
          status: false,
          message: "Reporting Manager not found",
        });
      }
    }

    const user = await User.create({
      name,
      email,
      password,
      isAdmin,
      isManager,
      isEmployee,
      role,
      title,
      employeeID,
      reportingManager: manager ? manager._id : null,
      profile: {},
    });

    if (user) {
      if (isAdmin) createJWT(res, user._id);
      user.password = undefined;

      return res.status(201).json({
        status: true,
        message: "User registered successfully",
        user,
      });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Invalid user data" });
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid email or password." });
    }

    if (!user.isActive) {
      return res.status(401).json({
        status: false,
        message: "User account has been deactivated, contact the administrator",
      });
    }

    if (await user.matchPassword(password)) {
      createJWT(res, user._id);
      user.password = undefined;
      return res.status(200).json(user);
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Invalid email or password" });
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    handleError(error, res);
  }
};

export const getEmployeeList = async (req, res) => {
  try {
    const users = await User.find().select(
      "name title role email employeeID isActive"
    );
    res.status(200).json(users);
  } catch (error) {
    handleError(error, res);
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;
    const { _id, ...updateData } = req.body;

    const id =
      isAdmin && userId === _id
        ? userId
        : isAdmin && userId !== _id
        ? _id
        : userId;

    const user = await User.findById(id);

    if (user) {
      // Update profile image URL if provided
      if (updateData.profile?.imageUrl) {
        user.profile.imageUrl = updateData.profile.imageUrl;
      }

      // Update the employeeID if provided
      if (updateData.employeeID) {
        // Ensure employeeID is unique
        const existingUser = await User.findOne({
          employeeID: updateData.employeeID,
        });
        if (
          existingUser &&
          existingUser._id.toString() !== user._id.toString()
        ) {
          return res.status(400).json({
            status: false,
            message: "Employee ID already in use",
          });
        }
        user.employeeID = updateData.employeeID;
      }

      user.name = updateData.name || user.name;
      user.title = updateData.title || user.title;
      user.role = updateData.role || user.role;
      user.isAdmin = updateData.isAdmin ?? user.isAdmin;
      user.isManager = updateData.isManager ?? user.isManager;
      user.isEmployee = updateData.isEmployee ?? user.isEmployee; // Modified here

      const updatedUser = await user.save();
      updatedUser.password = undefined;

      res.status(200).json({
        status: true,
        message: "Profile Updated Successfully.",
        user: updatedUser,
      });
    } else {
      res.status(404).json({ status: false, message: "User not found" });
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const activateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (user) {
      user.isActive = req.body.isActive;
      await user.save();

      res.status(200).json({
        status: true,
        message: `User account has been ${
          user.isActive ? "activated" : "disabled"
        }`,
      });
    } else {
      res.status(404).json({ status: false, message: "User not found" });
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({ status: true, message: "User deleted successfully" });
  } catch (error) {
    handleError(error, res);
  }
};

export const profileinfo = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;
    const {
      _id,
      personalInformation,
      workInformation,
      contactInformation,
      hierarchyInformation,
      identityInformation,
      resignationInformation,
      bankInformation,
    } = req.body;

    const id =
      isAdmin && userId === _id
        ? userId
        : isAdmin && userId !== _id
        ? _id
        : userId;

    const user = await User.findById(id);

    if (user) {
      // Update personalInformation if present
      if (personalInformation) {
        user.profile.personalInformation = {
          ...user.profile.personalInformation,
          ...personalInformation,
        };
      }

      // Update workInformation if present
      if (workInformation) {
        user.profile.workInformation = {
          ...user.profile.workInformation,
          ...workInformation,
        };
      }

      if (contactInformation) {
        user.profile.contactInformation = {
          ...user.profile.contactInformation,
          ...contactInformation,
        };
      }

      if (bankInformation) {
        user.profile.bankInformation = {
          ...user.profile.bankInformation,
          ...bankInformation,
        };
      }

      if (hierarchyInformation) {
        user.profile.hierarchyInformation = {
          ...user.profile.hierarchyInformation,
          ...hierarchyInformation,
        };
      }

      if (identityInformation) {
        user.profile.identityInformation = {
          ...user.profile.identityInformation,
          ...identityInformation,
        };
      }

      if (resignationInformation) {
        user.profile.resignationInformation = {
          ...user.profile.resignationInformation,
          ...resignationInformation,
        };
      }

      const updatedUser = await user.save();
      updatedUser.password = undefined;

      res.status(200).json({
        status: true,
        message: "Profile Information Updated Successfully.",
        user: updatedUser,
      });
    } else {
      res.status(404).json({ status: false, message: "User not found" });
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const getApprovers = async (req, res) => {
  try {
    const approvers = await User.find({
      $or: [{ role: "Manager" }],
    }).select("name _id role");

    if (!approvers || approvers.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No approvers found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Approvers fetched successfully",
      approvers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const getEmployeesByManager = async (req, res) => {
  try {
    const { managerId } = req.params; // ID of the manager

    // Find all users who have the specified manager as their reporting manager
    const employees = await User.find({ reportingManager: managerId }).select(
      "name _id role email employeeID"
    );

    if (!employees || employees.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No employees found reporting to this manager",
      });
    }

    res.status(200).json({
      status: true,
      message: "Employees fetched successfully",
      employees,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

// Get user detail
export const getProfileInfo = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;
    const { _id } = req.query;

    const id = isAdmin && userId === _id ? userId : isAdmin ? _id : userId;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const {
      personalInformation,
      workInformation,
      contactInformation,
      hierarchyInformation,
      identityInformation,
      resignationInformation,
      bankInformation,
    } = user.profile;

    res.status(200).json({
      status: true,
      message: "Profile Information Fetched Successfully.",
      personalInformation,
      workInformation,
      contactInformation,
      hierarchyInformation,
      identityInformation,
      resignationInformation,
      bankInformation,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getProfileInfoById = async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from request params

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    // Destructure profile information from user document
    const {
      personalInformation,
      workInformation,
      contactInformation,
      hierarchyInformation,
      identityInformation,
      resignationInformation,
      bankInformation,
      employeeID, // Include employeeID in the response
    } = user.profile;

    res.status(200).json({
      status: true,
      message: "Profile Information Fetched Successfully.",
      employeeID, // Include employeeID in the response
      personalInformation,
      workInformation,
      contactInformation,
      hierarchyInformation,
      identityInformation,
      resignationInformation,
      bankInformation,
    });
  } catch (error) {
    handleError(error, res);
  }
};
