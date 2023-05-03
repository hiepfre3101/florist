import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  desc: String,
});

export default mongoose.model("Hero", heroSchema);
