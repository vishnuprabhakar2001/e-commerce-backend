import express from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */
router.get("/", getAllProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Get single product
 * @access  Public
 */
router.get("/:id", getSingleProduct);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

/**
 * @route   POST /api/products
 * @desc    Create new product
 * @access  Admin
 */
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createProduct
);

/**
 * @route   PUT /api/products/:id
 * @desc    Update product
 * @access  Admin
 */
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateProduct
);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete product
 * @access  Admin
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteProduct
);

export default router;
