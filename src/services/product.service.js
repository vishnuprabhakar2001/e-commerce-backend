import Product from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";
import Category from "../models/category.model.js";

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
    sort = "newest",
    page = 1,
    limit = 10,
  } = queryParams;

  const query = {};

  // Keyword search
  if (keyword) {
    query.name = { $regex: keyword, $options: "i" };
  }

  // Category filter (ID or name)
  if (category) {
    const categoryDoc = await Category.findOne({
      $or: [
        { _id: category },
        { name: new RegExp(`^${category}$`, "i") },
      ],
    });

    if (!categoryDoc) {
      throw new ApiError(400, "Category not found");
    }

    query.category = categoryDoc._id;
  }

  // Price filter
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  // Sorting logic
  let sortOption = { createdAt: -1 }; // default: newest

  switch (sort) {
    case "price_asc":
      sortOption = { price: 1 };
      break;
    case "price_desc":
      sortOption = { price: -1 };
      break;
    case "name_asc":
      sortOption = { name: 1 };
      break;
    case "name_desc":
      sortOption = { name: -1 };
      break;
    case "newest":
    default:
      sortOption = { createdAt: -1 };
  }

  const pageNumber = Number(page);
  const pageLimit = Number(limit);
  const skip = (pageNumber - 1) * pageLimit;

  const products = await Product.find(query)
    .populate("category", "name")
    .sort(sortOption)
    .skip(skip)
    .limit(pageLimit);

  const totalProducts = await Product.countDocuments(query);

  return {
    products,
    totalProducts,
    currentPage: pageNumber,
    totalPages: Math.ceil(totalProducts / pageLimit),
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
