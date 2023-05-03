import { Router } from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary";
import { deleteImage, uploadImage } from "../controllers/upload";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { checkPermission } from "../middleware/checkPermission";
const router = Router();
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "hoaUi",
    format: "jpg",
  },
});
const upload = multer({
  storage: storage,
});

router.post("/upload/:id", upload.array("images", 3), uploadImage);
router.delete("/delete-image/:id", checkPermission, deleteImage);
export default router;
