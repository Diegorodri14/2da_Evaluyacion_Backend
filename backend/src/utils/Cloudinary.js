import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import { v2 as Cloudinary} from "cloudinary"
import {config} from "../../config.js"

Cloudinary.config({
    cloud_name: config.Cloudinary.cloudinary_name,
    api_key: config.Cloudinary.cloudinary_api_key,
    api_secret: config.Cloudinary.cloudinary_api_secret
});

const storage = new CloudinaryStorage({
    cloudinary: Cloudinary,
    params: {
        folder: "Evaluaciones",
        allowed_format: ["jpg", "png", "jpeg", "gif", "pdf"]
    },
});

const upload = multer({storage});

export default upload