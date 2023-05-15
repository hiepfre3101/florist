import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "type",
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
});

export default mongoose.model("category", categorySchema);
