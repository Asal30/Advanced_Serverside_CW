import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blogs", // Optional: folder in your Cloudinary account
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 800, height: 600, crop: "limit" }],
  },
});

export const parser = multer({ storage });