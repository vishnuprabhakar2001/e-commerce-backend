import ApiError from "../utils/ApiError.js";

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(400, "Authentication required before role authorization");
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(
        400,
        "You do not have permission to perform this action"
      );
    }

    next();
  };
};
