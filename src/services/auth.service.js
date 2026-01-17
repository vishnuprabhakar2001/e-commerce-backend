import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

export const registerUserService = async (userData) => {
  const { name, email, password } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists with this email");
  }

  const user = await User.create({ name, email, password });

  return User.findById(user._id).select("-password");
};


export const loginUserService = async ({ email, password }) => {
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(400, "Invalid email or password");
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid email or password");
  }

  const token = user.generateJWT();

  const loggedInUser = await User.findById(user._id).select("-password");

  return {
    user: loggedInUser,
    token
  };
};




