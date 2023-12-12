import mongoose from "mongoose";
import { shiftHue, findRelatedColors } from "../Utilities/colorUtils.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    tags: [
      {
        type: mongoose.ObjectId,
        ref: "Tags",
      },
    ],
    color: {
      type: String,
      required: false,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

// for indexnng the colour to have better queries
productSchema.index({ color: 1 });

// Static method to find products by color
productSchema.statics.findProductsByColor = async function (color) {
  const relatedColors = findRelatedColors(color);
  const products = await this.find({
    $or: [{ color: color }, { color: { $in: relatedColors } }],
  });
  return products;
};
export default mongoose.model("Products", productSchema);
