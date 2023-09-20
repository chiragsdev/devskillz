import AppError from "../utils/error.js";
import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  // extracting token from the cookies
  const { token } = req.cookies;

  // If no token send unauthorized message
  if (!token) {
    return next(new AppError("unauthenticated please login again", 401));
  }

  // Decoding the token using jwt package verify method
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // If no decode send the message unauthorized
  if (!decoded) {
    return next(new AppError("Unauthorized, please login to continue", 401));
  }

  // If all good store the id in req object, here we are modifying the request object and adding a custom field user in it
  req.decodedToken = decoded;

  next();
};

export const authorizedRoles = (...roles) => {
  return async function (req, res, next) {
    const currentUserRole = req.decodedToken.role;
    if (!roles.includes(currentUserRole)) {
      return next(new AppError("Access Denied: unauthorized user", 403));
    }
    next();
  };
};
