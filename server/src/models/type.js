import mongoose from "mongoose";

const typeSchema = new mongoose.Schema({
  name: String,
  subCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
});

export default mongoose.model("type", typeSchema);
