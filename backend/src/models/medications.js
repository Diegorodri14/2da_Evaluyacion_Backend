/*
    specialtyName,
    description,
    isAvailable
*/

import { Schema, model } from "mongoose";

const medicationsSchema = new Schema(
  {
    specialtyName: {type : String},
    description: {type : String},
    isAvailable: {type : Boolean},
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("medications", medicationsSchema);
