import Order from "../models/order.model.js";
import {Cart} from "../models/cart.model.js";
import Product from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";

export const placeOrderService = async (userId, shippingAddress) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

  let totalAmount = 0;

  const orderItems = cart.items.map((item) => {
    if (item.quantity > item.product.stock) {
      throw new ApiError(
        400,
        `Insufficient stock for ${item.product.name}`
      );
    }

    totalAmount += item.quantity * item.product.price;

    return {
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    };
  });

  // Reduce stock
  for (const item of cart.items) {
    item.product.stock -= item.quantity;
    await item.product.save();
  }

  const order = await Order.create({
    user: userId,
    items: orderItems,
    totalAmount,
    shippingAddress,
    paidAt: new Date(),
  });

  // Clear cart
  cart.items = [];
  await cart.save();

  return order;
};

export const getUserOrdersService = async (userId) => {
  return Order.find({ user: userId }).sort({ createdAt: -1 });
};

export const getAllOrdersService = async () => {
  return Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
};

export const updateOrderStatusService = async (orderId, status) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(400, "Order not found");
  }

  order.status = status;
  await order.save();

  return order;
};


export const cancelOrderByUserService = async (orderId, userId) => {
  const order = await Order.findOne({ _id: orderId, user: userId });

  if (!order) {
    throw new ApiError(400, "Order not found");
  }

  if (order.status === "cancelled") {
    throw new ApiError(400, "Order is already cancelled");
  }

  if (["shipped", "delivered"].includes(order.status)) {
    throw new ApiError(
      400,
      "Order cannot be cancelled after shipment"
    );
  }

  // Restore stock
  for (const item of order.items) {
    const product = await Product.findById(item.product);
    if (product) {
      product.stock += item.quantity;
      await product.save();
    }
  }

  order.status = "cancelled";
  await order.save();

  return order;
};

export const cancelOrderByAdminService = async (orderId) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(400, "Order not found");
  }

  if (order.status === "cancelled") {
    throw new ApiError(400, "Order is already cancelled");
  }

  // Restore stock
  for (const item of order.items) {
    const product = await Product.findById(item.product);
    if (product) {
      product.stock += item.quantity;
      await product.save();
    }
  }

  order.status = "cancelled";
  await order.save();

  return order;
};
