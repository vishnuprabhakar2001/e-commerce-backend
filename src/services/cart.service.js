import { Cart } from "../models/cart.model.js";
import  Product  from "../models/product.model.js";
import  ApiError  from "../utils/ApiError.js";

const calculateTotalPrice = (items) => {
  return items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

export const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
      totalPrice: 0,
    });
  }

  return cart;
};

export const addItemToCart = async (userId, productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(400, "Product not found");
  }

  const cart = await getOrCreateCart(userId);

  const cartItem = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
      price: product.price,
    });
  }

  cart.totalPrice = calculateTotalPrice(cart.items);
  await cart.save();

  return cart;
};

export const fetchUserCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId }).populate(
    "items.product"
  );

  if (!cart) {
    throw new ApiError(400, "Cart not found");
  }

  return cart;
};

export const updateCartItem = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new ApiError(400, "Cart not found");
  }

  const item = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (!item) {
    throw new ApiError(400, "Product not found in cart");
  }

  item.quantity = quantity;
  cart.totalPrice = calculateTotalPrice(cart.items);

  await cart.save();
  return cart;
};

export const removeCartItem = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new ApiError(400, "Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  cart.totalPrice = calculateTotalPrice(cart.items);
  await cart.save();

  return cart;
};

export const clearCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new ApiError(400, "Cart not found");
  }

  cart.items = [];
  cart.totalPrice = 0;

  await cart.save();
  return cart;
};
