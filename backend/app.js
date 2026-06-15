import express from "express";
import PatientsRoutes from "./src/routes/patientsRoutes.js"
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/patients", PatientsRoutes);

export default app;