import ApiError from "../utils/ApiError.js";

export const validateCategory = (req, res, next) => {
  const { name } = req.body;

  if (!name || name.trim().length < 2) {
    throw new ApiError(400, "Category name must be at least 2 characters");
  }

  next();
};
