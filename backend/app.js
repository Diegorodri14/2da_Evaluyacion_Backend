import express from "express";
import PatientsRoutes from "./src/routes/patientsRoutes.js"
import LoginRoutes from "./src/routes/loginPatientsRoutes.js"
import RegisterRoutes from "./src/routes/registerPatientsRoutes.js"
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/patients", PatientsRoutes);
app.use("/api/login", LoginRoutes);
app.use("/api/register", RegisterRoutes);

export default app;