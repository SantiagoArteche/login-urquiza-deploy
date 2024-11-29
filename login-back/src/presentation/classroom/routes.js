import { Router } from "express";
import {
  createClassroom,
  deleteClassroom,
  getClassrooms,
  updateClassroom,
} from "./controller.js";

export const classRoomRouter = Router();

classRoomRouter.get("/", getClassrooms);
classRoomRouter.post("/", createClassroom);
classRoomRouter.put("/:id", updateClassroom);
classRoomRouter.delete("/:id", deleteClassroom);
