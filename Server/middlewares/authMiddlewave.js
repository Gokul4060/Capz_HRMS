import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ status: false, message: "Not authorized" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId).select(
      "isAdmin isManager isEmployee email role"
    );

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    req.user = {
      userId: decodedToken.userId,
      email: user.email,
      isAdmin: user.isAdmin,
      isManager: user.isManager,
      isEmployee: user.isEmployee, // Modified here
      role: user.role,
    };

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ status: false, message: "Not authorized" });
  }
};

const isAdminOrManagerRoute = (req, res, next) => {
  if (req.user && (req.user.isAdmin || req.user.isManager)) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as admin or manager.",
    });
  }
};

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, "yourSecretKey");
      req.userId = decoded.id;
      next();
    } catch (err) {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};

const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as admin. Try login as admin.",
    });
  }
};

const checkRole = (roles) => (req, res, next) => {
  if (roles.includes(req.user.role)) {
    next();
  } else {
    res.status(403).json({ status: false, message: "Access denied" });
  }
};

const isManagerRoute = (req, res, next) => {
  if (req.user && req.user.isManager) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as manager. Try login as manager.",
    });
  }
};

const isEmployeeRoute = (req, res, next) => {
  // Modified here
  if (req.user && req.user.isEmployee) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as employee. Try login as employee.",
    });
  }
};

export {
  protectRoute,
  checkRole,
  isAdminRoute,
  isAdminOrManagerRoute,
  isManagerRoute,
  isEmployeeRoute,
};
