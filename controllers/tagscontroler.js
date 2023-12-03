// tagsController.js
import tagsModel from "../models/tagsModel.js";

// Create a new tag
export const createTagController = async (req, res) => {
  try {
    const { name } = req.body;

    // Validation
    if (!name) {
      return res.status(500).send({ error: "Tag name is required" });
    }
    const existingTag = await tagsModel.findOne({ name: name });
    if (existingTag != null)
      return res.status(400).send({ message: "Tag Already Exists" });
   

    const tag = new tagsModel({ name });
    await tag.save();

    res.status(201).send({
      success: true,
      message: "Tag created successfully",
      tag,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating tag",
    });
  }
};

// Get all tags
export const getTagsController = async (req, res) => {
  try {
    const tags = await tagsModel.find({});
    res.status(200).send({
      success: true,
      countTotal: tags.length,
      message: "All tags",
      tags,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting tags",
      error: error.message,
    });
  }
};

// Delete a tag
export const deleteTagController = async (req, res) => {
  try {
    await tagsModel.findByIdAndDelete(req.params.tid);
    res.status(200).send({
      success: true,
      message: "Tag deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting tag",
      error,
    });
  }
};

// Get Tag by ID
export const getTagByIdController = async (req, res) => {
  try {
    const tag = await tagsModel.findById(req.params.tid);

    if (!tag) {
      return res.status(404).send({
        success: false,
        message: "Tag not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Tag found by ID",
      tag,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting tag by ID",
      error,
    });
  }
};

// Get a tag by name
export const getTagByNameController = async (req, res) => {
  try {
    const tag = await tagsModel.findOne({ name: req.params.name });

    if (!tag) {
      return res.status(404).send({
        success: false,
        message: "Tag not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Tag found by name",
      tag,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting tag by name",
      error,
    });
  }
};
