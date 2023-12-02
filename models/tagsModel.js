
import mongoose from "mongoose";

const tagsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
   
  },
  { timestamps: true }
);

export default mongoose.model("Tags", tagsSchema);

