import User from "../models/userModel.js";
import AppError from "../utils/error.js";
import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("Unauthenticated, please login again", 400));
  }

  try {
    const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = userDetails;

    next();
  } catch (error) {
    return next(new AppError("please login again !!", 400));
  }
};

export const authorizedRoles = (...roles) => {
  return async function (req, res, next) {
    const currentUserRole = req.user.role;
    if (!roles.includes(currentUserRole)) {
      return next(new AppError("Access Denied: unauthorized user", 403));
    }
    next();
  };
};

export const authorizeSubscriber = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  console.log(user);

  if (user.role !== "ADMIN" && user.subscription.status !== "active") {
    return next(
      new AppError("please subscription to access this route !", 403)
    );
  }
  next();
};
