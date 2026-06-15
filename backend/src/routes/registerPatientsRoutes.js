import express from "express"
import RegisterController from "../controllers/controllerRegisterPatients.js"
import upload from "../utils/Cloudinary.js"

const router = express.Router()

router.route("/")
.post(upload.single("profilePhoto"),RegisterController.register);

router.route("/verifyCodeEmail")
.post(RegisterController.verifyCode);

export default router
