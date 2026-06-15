import express from "express"
import controllerLoginPatients from "../controllers/controllerLoginPatients.js"

const router = express.Router()

router.route("/")
.post(controllerLoginPatients.login)

export default router
