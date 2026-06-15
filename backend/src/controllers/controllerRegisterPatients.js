import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { v2 as Cloudinary } from "cloudinary";

import patientsModal from "../models/patients.js";

import { config } from "../../config.js";
import { register } from "module";

const registerPatientsController = {};

registerPatientsController.register = async (req, res) => {
  try {
    const {
      name,
      lastName,
      email,
      password,
      birthDate,
      phone,
      address,
      phoneEmergencyContacts,
      profilePhoto,
      public_id,
    } = req.body;

    const existPatient = await patientsModal.findOne({ email });
    if (existPatient) {
      return res
        .status(400)
        .json({ message: "El paciente ya esta registrado" });
    }

    const passwordHashed = await bcryptjs.hash(password, 10);

    const randomCode = crypto.randomBytes(3).toString("hex");

    const token = jsonwebtoken.sign({
      name,
      lastName,
      email,
      password: passwordHashed,
      birthDate,
      phone,
      address,
      phoneEmergencyContacts,
      profilePhoto,
      public_id,
      isVerified,
    });

    (config.JWT.secret, { expireIn: "25m" });

    res.cookie("registrationCookie", token, { maxAge: 15 * 60 * 1000 });

    const trasporte = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user_email,
        user: config.email.user_password,
      },
    });

    const mailOptions = {
      from: config.email.user_email,
      to: email,
      subject: "Verificacion de cuenta",
      text:
        "Has recibido este codigo importante para ello necesitamos que pongas este codigo ( " +
        randomCode +
        " ) para verficar que has dado la autorizacion",
    };

    trasporte.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Error sending Email" });
      }
      return res.status(200).json({ message: "Correo autorizado!" });
    });
  } catch (error) {
    console.log(error + "Error");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

registerPatientsController.verifyCode = async (req, res) => {
  try {
    const { verificationCodeRequest } = req.body;
    const token = req.cookies.registrationCookie;

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    const {
      randomCode: storedCode,
      name,
      lastName,
      email,
      password,
      birthDate,
      phone,
      address,
      phoneEmergencyContacts,
      profilePhoto,
      public_id,
      isVerified,
    } = decoded;

    if (verificationCodeRequest !== storedCode) {
      return res
        .status(400)
        .json({ message: "El codigo que ingreso es invalido" });
    }

    const newPatient = patientsModal({
      name,
      lastName,
      email,
      password,
      birthDate,
      phone,
      address,
      phoneEmergencyContacts,
      profilePhoto: req.file.path,
      public_id: req.file.filename,
      isVerified: true,
    });

    await newPatient.save();

    res.clearCookie("registrationCookie");

    res.status(200).json({ message: "El paciente fue registrado" });
  } catch (error) {
    console.log(error + "Error");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default registerPatientsController;
