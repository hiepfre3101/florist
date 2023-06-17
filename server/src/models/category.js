import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "type",
  },
  bouquets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bouquet",
    },
  ],
});

export default mongoose.model("category", categorySchema);
