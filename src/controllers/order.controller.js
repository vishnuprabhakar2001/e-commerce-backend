import asyncHandler from "../middlewares/async.middleware.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  placeOrderService,
  getUserOrdersService,
  getAllOrdersService,
  updateOrderStatusService,
  cancelOrderByUserService,
  cancelOrderByAdminService,
} from "../services/order.service.js";

export const placeOrder = asyncHandler(async (req, res) => {
  const { shippingAddress } = req.body;

  const order = await placeOrderService(req.user._id, shippingAddress);

  res.status(201).json(
    new ApiResponse(201, order, "Order placed successfully")
  );
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await getUserOrdersService(req.user._id);

  res.status(200).json(
    new ApiResponse(200, orders, "Orders fetched successfully")
  );
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await getAllOrdersService();

  res.status(200).json(
    new ApiResponse(200, orders, "All orders fetched successfully")
  );
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await updateOrderStatusService(req.params.id, status);

  res.status(200).json(
    new ApiResponse(200, order, "Order status updated")
  );
});


export const cancelMyOrder = asyncHandler(async (req, res) => {
  const order = await cancelOrderByUserService(
    req.params.id,
    req.user._id
  );

  res.status(200).json(
    new ApiResponse(200, order, "Order cancelled successfully")
  );
});

export const cancelOrderByAdmin = asyncHandler(async (req, res) => {
  const order = await cancelOrderByAdminService(req.params.id);

  res.status(200).json(
    new ApiResponse(200, order, "Order cancelled by admin")
  );
});
