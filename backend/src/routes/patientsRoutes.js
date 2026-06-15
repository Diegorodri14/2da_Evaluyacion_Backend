import express from "express"
import patientsController from "../controllers/controllerPatients.js"
import upload from "../utils/Cloudinary.js"

const router = express.Router()

router.route("/")
.get(patientsController.GetAllPatients);

router.route("/:id")
.put(upload.single("profilePhoto"), patientsController.UpdatePatient)
.delete(patientsController.DeletePatient);

export default router
