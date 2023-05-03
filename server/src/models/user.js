import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  avatarDefault: String,
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "image",
    },
  ],
});
userSchema.plugin(mongoosePaginate);
export default mongoose.model("User", userSchema);
