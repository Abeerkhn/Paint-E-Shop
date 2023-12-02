
import mongoose from "mongoose";

const tagsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // You can add more fields to your tags schema as needed
  },
  { timestamps: true }
);

export default mongoose.model("Tags", tagsSchema);

