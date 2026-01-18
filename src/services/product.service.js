import Product from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";

export const createProductService = async (productData) => {
  const product = await Product.create(productData);
  return product;
};

export const getAllProductsService = async (queryParams) => {
  const {
    keyword,
    category,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
  } = queryParams;

  const query = {};

  // Keyword search (product name)
  if (keyword) {
    query.name = {
      $regex: keyword,
      $options: "i",
    };
  }

  // Category filter
  if (category) {
    query.category = category;
  }

  // Price filter
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const products = await Product.find(query)
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const totalProducts = await Product.countDocuments(query);

  return {
    products,
    totalProducts,
    currentPage: Number(page),
    totalPages: Math.ceil(totalProducts / limit),
  };
};

export const getSingleProductService = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(400, "Product not found");
  }
  return product;
};

export const updateProductService = async (productId, updateData) => {
  const product = await Product.findByIdAndUpdate(
    productId,
    updateData,
    { new: true, runValidators: true }
  );

  if (!product) {
    throw new ApiError(400, "Product not found");
  }

  return product;
};

export const deleteProductService = async (productId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(400, "Product not found");
  }

  await product.deleteOne();
  return product;
};
