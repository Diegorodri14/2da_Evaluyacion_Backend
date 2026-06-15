import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import patientsModel from "../models/patients.js";

import { config } from "../../config.js";

const controllerLoginPatients = {};

controllerLoginPatients.login = async (req, res) => {
  try {

    const {email, password} = req.body;
    const patientFound = await patientsModel.findOne({email});
    
    if(!patientFound){
        return res.status(400).json({ message : "Paciente no encontrado"});
    }

    if(patientFound.timeOut && patientFound.timeOut > Date.now()){
        return res.status(403).json({ message : "Cuenta Bloqueada"})
    }

    const isMatch = await bcrypt.compare( password, patientFound.password);

    if(!isMatch){
        patientFound.loginAttemps = (patientFound.loginAttemps(10) + 1)
        return res.status(401).json({ message : "Contraseña incorrecta"})
    }

    if(patientFound.loginAttemps >= 5){
        patientFound.timeOut = Date.now(), + 5 * 60 * 1000
        patientFound.loginAttemps = 0

        return res.status(400).json({message : "Cuenta Bloqueada"})
    }

    await patientFound.save()

    patientFound.loginAttemps = 0;
    patientFound.timeOut = null

    const token = jsonwebtoken.sign(
        {id : patientFound._id, userType: "patients"},
        config.JWT.secret,
        {expiresIn: "30d"}
    )

    res.cookie("authCookie", token)

    return res.status(200).json({ message: "Login exitoso"})
 
  } catch (error) {
    console.log(error + "error");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default controllerLoginPatients