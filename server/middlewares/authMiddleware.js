import AppError from "../utils/error.js";
import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("Unauthenticated, please login again", 400));
  }

  const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
  req.user = userDetails;

  next();
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
  const subscription = req.user.Subscription;

  const currentUserRole = req.user.role;

  if (currentUserRole != "ADMIN" && subscription.status != "active") {
    return next(
      new AppError("please subscription to access this route !", 403)
    );
  }
  next();
};
