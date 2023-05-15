import mongoose from "mongoose";
import paganinate from "mongoose-paginate-v2";
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    total: Number,
    products: [
      {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
    status: String,
  },
  { timestamps: true, versionKey: false }
);
orderSchema.plugin(paganinate);
export default mongoose.model("order", orderSchema);
