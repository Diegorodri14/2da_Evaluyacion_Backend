import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

import HTMLRecoveryEmail from "../utils/sendMailRecovery.js";
import RecoveryModel from "../models/patients.js";
import { config } from "../../config.js";

const recoveryController = {};

recoveryController.requestCode = async (req, res) => {
  try {
    const {email} = req.body;

    const patientFound = await RecoveryModel.findOne{(email)}

    if(!patientFound){

    }
  } catch (error) {
    console.log(error + "error");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
