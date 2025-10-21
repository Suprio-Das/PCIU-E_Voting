import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "evoting-uploads", // Folder name in your Cloudinary
        allowed_formats: ["jpg", "jpeg", "png"],
        public_id: (req, file) => {
            const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
            return uniqueName; // cloudinary file name
        },
    },
});

const upload = multer({ storage });

export default upload;