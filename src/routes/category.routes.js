import express from "express";
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { validateCategory } from "../validators/category.validator.js";
const router = express.Router();

// Public
router.get("/", getAllCategories);

// Admin
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  validateCategory,
  createCategory
);


router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateCategory
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteCategory
);

export default router;
