import cloudinary from "../config/cloudinary";
import Image from "../models/image";
import User from "../models/user";

export const uploadImage = async (req, res) => {
  const files = req.files;
  const userId = req.params.id;
  if (!files) {
    return res.status(404).json({
      message: "No file was upload!",
    });
  }
  try {
    const uploadPromise = files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path, {}, (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve(result);
        });
      });
    });
    const results = await Promise.all(uploadPromise).catch((reasons) =>
      console.log(reasons)
    );
    const createPromise = results.map((result) => {
      return Image.create({
        url: result.secure_url,
        publicId: result.public_id,
        userId: userId,
      });
    });
    const responseMongo = await Promise.all(createPromise);
    await User.findByIdAndUpdate(userId, {
      $addToSet: { images: responseMongo.map((res) => res.id) },
    });
    const uploadedFiles = results.map((result) => {
      return {
        url: result.secure_url,
        publicId: result.public_id,
      };
    });
    return res.status(200).json({
      urls: uploadedFiles,
      message: "Upload successfully: " + responseMongo,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Loi me r: " + error.message,
    });
  }
};

export const deleteImage = async (req, res) => {
  const publicId = req.params.id;
  const imageId = req.query.imgId;
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    const responseMongo = await Image.findByIdAndDelete(imageId);
    return res
      .status(200)
      .json({ message: "Xóa ảnh thành công", result, responseMongo });
  } catch (error) {
    res.status(500).json({ error: error.message || "Error deleting image" });
  }
};
