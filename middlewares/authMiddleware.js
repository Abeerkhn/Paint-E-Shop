import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Routes token-based authentication
export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Token not provided" });
    }

    const decoded = JWT.verify(token, "test");
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// Admin access middleware
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    if (user.role !== 1) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Access" });
    }

    next();
  } catch (error) {
    console.error("Admin Middleware Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error in admin middleware", error });
  }
};
