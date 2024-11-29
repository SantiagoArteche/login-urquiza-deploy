import { Schema, model } from "mongoose";

const asignatureSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "La asignatura es obligatoria"],
    },
    career: {
      type: [String],
      enum: ["DS", "AF", "IT"],
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export const asignatureModel = model("Asignature", asignatureSchema);
