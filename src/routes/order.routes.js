import express from "express";
import {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

// User
router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);

// Admin
router.get("/", protect, authorizeRoles("admin"), getAllOrders);
router.put(
  "/:id/status",
  protect,
  authorizeRoles("admin"),
  updateOrderStatus
);

export default router;
