// tagRoutes.js
import express from "express";
import {
  createTagController,
  deleteTagController,
  getTagsController,
  getTagByIdController,
  getTagByNameController,
} from "../controllers/tagscontroler.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create Tag Route
router.post("/create-tag", requireSignIn, isAdmin, createTagController);

// Delete Tag Route
router.delete("/delete-tag/:tid", requireSignIn, isAdmin, deleteTagController);

// Get All Tags Route
router.get("/get-tags", requireSignIn, getTagsController);

// Get Tag by ID Route
router.get("/get-tag/:tid", requireSignIn, getTagByIdController);

// Get Tag by Name Route
router.get("/get-tag-by-name/:name", requireSignIn, getTagByNameController);

export default router;
