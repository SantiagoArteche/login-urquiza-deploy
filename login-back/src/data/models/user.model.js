import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
    },
    email: {
      type: String,
      required: [true, "El email es requerido"],
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
    },
    role: {
      type: String,
      enum: ["superusuario", "directivo", "alumno", "docente"],
      default: "alumno",
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

export const userModel = model("User", userSchema);
