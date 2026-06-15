import patientsModel from "../models/patients.js";

import { v2 as Cloudinary } from "cloudinary";

const patientsController = {};

//GET
patientsController.GetAllPatients = async (req, res) => {
  try {
    const patients = await patientsModel.find();
    return res.status(200).json(patients);
  } catch (error) {
    console.log(error + "error");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//UPDATE
patientsController.UpdatePatient = async (req, res) => {
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
    } = req.body;

    const patientFound = await patientsModel.findById(req.params.id);

    const updatePatient = {
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
    };

    if (req.file) {
      await Cloudinary.uploader.destroy(patientFound.public_id);
      updatePatient.profilePhoto = req.file.path;
      updatePatient.public_id = req.file.filename;
    }

    await patientsModel.findByIdAndUpdate(req.params.id, updatePatient, {
      new: true,
    });

    return res.status(200).json({ message: "El paciente se ha actualizado" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//DELETE
patientsController.DeletePatient = async (req, res) => {
  try { 
    const patientFound = await MediaSourceHandle.findById(req.params.id);

    await Cloudinary.uploader.destroy(patientFound.public_id);

    const patientDeleted = await patientsModel.findByIdAndDelete(req.params.id)

    if(!patientDeleted){
        return res.status(404).json({message : "Paciente no encontrado"});
    }

    return res.status(200).json({ message : "El paciente se elimino correctamente"});

  } catch (error) {
    console.log(error + "error");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default patientsController