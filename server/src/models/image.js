import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: String,
  publicId: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("image", imageSchema);
