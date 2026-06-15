import medicationsModel from "../models/medications.js";

const ControllerMedications = {};

//GET
ControllerMedications.GetAllmedications = async (req, res) => {
  try {
    const medications = await medicationsModel.find();
    return res.status(200).json(medications);
  } catch (error) {
    console.log(error + "error");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//INSERT
ControllerMedications.InsertMedication = async (req, res) => {
  try {
    const { specialtyName, description, isAvailable } = req.body;

    const newMedication = new medicationsModel({
      specialtyName,
      description,
      isAvailable,
    });

    await newMedication.save();
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  //UPDATE
  ControllerMedications.UpdateMedication = async (req, res) => {
    try {
      const { specialtyName, description, isAvailable } = req.body;

      const updatedMedications = await medicationsModel.findByIdAndUpdate(
        req.params.id,
        {
          specialtyName,
          description,
          isAvailable,
        },
        {
          new: true,
        },
      );

      if (!updatedMedications) {
        return res
          .status(404)
          .json({ message: "El medicamento no fue encontrado" });
      }

      return res.status(200).json({ message: "El paciente se ha actualizado" });
    } catch (error) {
      console.log("error" + error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  //DELETE
  ControllerMedications.DeleteMedication = async (req, res) => {
    try {
      const deletedMedication = medicationsModel.findByIdAndDelete(
        req.params.id,
      );

      if (deletedMedication) {
        return res
          .status(404)
          .json({ message: "El medicamento no fue encontrado" });
      }

      return res.status(200).json({ message: "El medicamento fue eliminado" });
    } catch (error) {
      console.log(error + "error");
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
export default ControllerMedications;
