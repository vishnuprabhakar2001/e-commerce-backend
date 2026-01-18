import asyncHandler from "../middlewares/async.middleware.js";
import {
  createProductService,
  getAllProductsService,
  getSingleProductService,
  updateProductService,
  deleteProductService,
} from "../services/product.service.js";

export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    stock,
    category,
    images,
  } = req.body;

  if (!name || !description || price == null || stock == null || !category) {
    throw new ApiError(400, "All required product fields must be provided");
  }

  const product = await createProductService({
    name,
    description,
    price,
    stock,
    category,
    images,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const result = await getAllProductsService(req.query);

  res.status(200).json({
    success: true,
    totalProducts: result.totalProducts,
    currentPage: result.currentPage,
    totalPages: result.totalPages,
    count: result.products.length,
    data: result.products,
  });
});


export const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await getSingleProductService(req.params.id);

  res.status(200).json({
    success: true,
    data: product,
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await updateProductService(
    req.params.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  await deleteProductService(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
