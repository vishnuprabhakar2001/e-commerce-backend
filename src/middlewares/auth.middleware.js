import jwt from "jsonwebtoken";
import asyncHandler from "./async.middleware.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    throw new ApiError(401, "Not authorized, token missing");
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decoded._id).select("-password");

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  req.user = user; 
  next();
});
