import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import tagsModel from "../models/tagsModel.js";

import fs from "fs";
import slugify from "slugify";
// import braintree from "braintree";
import dotenv from "dotenv";
import { findRelatedColors } from "../Utilities/colorUtils.js";

dotenv.config();

export const createProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      tags,
      color,
      photos,
    } = req.body;

    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is Required" });
      case !description:
        return res.status(400).send({ error: "Description is Required" });
      case !price:
        return res.status(400).send({ error: "Price is Required" });
      case !category:
        return res.status(400).send({ error: "Category is Required" });
      case !quantity:
        return res.status(400).send({ error: "Quantity is Required" });
      case !photos || photos.length === 0:
        return res
          .status(400)
          .send({ error: "At least one photo URL is required" });
    }

    // Create product instance
    const newProduct = new productModel({
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      tags,
      color,
      photos,
      slug: slugify(name),
    });

    // Save the product to the database
    await newProduct.save();

    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
}

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};
// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

// get photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate producta
export const updateProductController = async (req, res) => {
  try {
    const { pid } = req.params;

    // Assuming req.body contains the updated data including photo URLs
    const updatedProduct = await productModel.findByIdAndUpdate(
      pid,
      { ...req.body, slug: slugify(req.body.name) },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error in updateProductController:", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating product",
    });
  }  
};
// filters
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get prdocyst by catgory
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    console.log("Category:", category);

    const products = await productModel.find({ category }).populate("category");
    console.log("Products:", products);
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

// Get products on colour (related too)
export const searchByColorController = async (req, res) => {
  try {
    const { color } = req.params;

    // Use the static method from the model to find products by color
    const products = await productModel.find({
      $or: [{ color: color }, { color: { $in: findRelatedColors(color) } }],
    });

    res.json({
      success: true,
      message: `Products with color ${color} retrieved successfully`,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error retrieving products by color",
      error: error.message,
    });
  }
};

// Get all colours
export const availableColorsController = async (req, res) => {
  try {
    // Logic to retrieve all unique colors from the database
    const uniqueColors = await productModel.distinct("color");

    res.json({
      success: true,
      message: "Available colors retrieved successfully",
      colors: uniqueColors,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error retrieving available colors",
      error: error.message,
    });
  }
};

// Search products by tags
export const searchByTagsController = async (req, res) => {
  try {
    const { tags } = req.params;

    // Convert the comma-separated string of tags into an array
    const tagsArray = tags.split(',');

    // Find Tags documents based on tag names
    const tagsDocuments = await tagsModel.find({ name: { $in: tagsArray } });

    // Extract ObjectId values from the found Tags documents
    const tagsIds = tagsDocuments.map(tag => tag._id);

    // Use the $in operator to find products with tags in the array of ObjectId
    const products = await productModel.find({
      tags: { $in: tagsIds }
    });

    res.json({
      success: true,
      message: `Products with tags ${tags} retrieved successfully`,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error retrieving products by tags",
      error: error.message,
    });
  }
};