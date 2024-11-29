import { Schema, model } from "mongoose";

const classRoomSchema = new Schema(
  {
    grade: {
      type: String,
      required: true,
    },
    asignature: {
      type: Schema.Types.ObjectId,
      ref: "Asignature",
      required: [true, "La asignatura es obligatoria"],
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "El profesor es requerido"],
    },
    students: {
      type: [Schema.Types.ObjectId],
      ref: "Users",
      required: [true, "Los alumnos son requeridos"],
    },
  },
  {
    versionKey: false,
  }
);

export const classRoomModel = model("Classroom", classRoomSchema);
