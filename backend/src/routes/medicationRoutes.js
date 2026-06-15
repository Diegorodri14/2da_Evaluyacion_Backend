import express from "express"
import MedicationController from "../controllers/controllerMedications.js"
const router = express.Router()

router.route("/")
.get(MedicationController.GetAllmedications)
.post(MedicationController.InsertMedication);

router.route("/:id")
.put(MedicationController.UpdateMedication)
.delete(MedicationController.DeleteMedication);

export default router
