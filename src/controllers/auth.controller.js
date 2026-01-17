import asyncHandler from "../middlewares/async.middleware.js";
import { registerUserService, loginUserService } from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";

export const registerUser = asyncHandler(async (req, res) => {
  const user = await registerUserService(req.body);

  res.status(201).json(
    new ApiResponse(201, user, "User registered successfully")
  );
});


export const loginUser = asyncHandler(async (req, res) => {
  const { user, token } = await loginUserService(req.body);

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000 // 15 minutes (match ACCESS_TOKEN_EXPIRY)
  });

  res.status(200).json(
    new ApiResponse(200, user, "Login successful")
  );
});

