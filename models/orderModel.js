import mongoose from "mongoose";


const productObj = new mongoose.Schema({
  productId: {
    type: mongoose.ObjectId,
    ref: "Products",
  },
  price: {
    type: Number,
  },
  name: {
    type: String
  },
  photos: [
    {
      type: String, // Assuming these are URLs of images stored on Cloudinary
    },
  ],

})


const orderSchema = new mongoose.Schema(
  {
    products: [productObj],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "Deliverd", "Cancel"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
