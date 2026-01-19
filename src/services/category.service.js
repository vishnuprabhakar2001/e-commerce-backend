import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";

export const createCategoryService = async (data) => {
  const existing = await Category.findOne({
    name: new RegExp(`^${data.name}$`, "i"),
  });

  if (existing) {
    throw new ApiError(400, "Category already exists");
  }

  if (data.parent) {
    const parentExists = await Category.findById(data.parent);
    if (!parentExists) {
      throw new ApiError(400, "Parent category not found");
    }
  }

  return Category.create(data);
};

export const getAllCategoriesService = async () => {
  return Category.find().populate("parent", "name");
};

export const updateCategoryService = async (id, data) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(400, "Category not found");
  }

  if (data.parent) {
    const parentExists = await Category.findById(data.parent);
    if (!parentExists) {
      throw new ApiError(400, "Parent category not found");
    }
  }

  Object.assign(category, data);
  await category.save();

  return category;
};

export const deleteCategoryService = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(400, "Category not found");
  }

  const productCount = await Product.countDocuments({ category: id });

  if (productCount > 0) {
    throw new ApiError(
      400,
      "Cannot delete category associated with products"
    );
  }

  await category.deleteOne();
};
