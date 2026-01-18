import  asyncHandler  from "../middlewares/async.middleware.js";
import {
  addItemToCart,
  fetchUserCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../services/cart.service.js";
import  ApiError  from "../utils/ApiError.js";
import  ApiResponse  from "../utils/ApiResponse.js";

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    throw new ApiError(400, "Product ID and quantity are required");
  }

  const cart = await addItemToCart(
    req.user._id,
    productId,
    quantity
  );

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Product added to cart"));
});

export const getCart = asyncHandler(async (req, res) => {
  const cart = await fetchUserCart(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart fetched successfully"));
});

export const updateCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    throw new ApiError(400, "Product ID and quantity are required");
  }

  const cart = await updateCartItem(
    req.user._id,
    productId,
    quantity
  );

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart updated successfully"));
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    throw new ApiError(400, "Product ID is required");
  }

  const cart = await removeCartItem(
    req.user._id,
    productId
  );

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Product removed from cart"));
});

export const clearUserCart = asyncHandler(async (req, res) => {
  const cart = await clearCart(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart cleared successfully"));
});
