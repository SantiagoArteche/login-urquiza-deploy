import { Router } from "express";
import {
  createAsignature,
  deleteAsignature,
  getAsignatures,
  updateAsignature,
} from "./controller.js";

export const asignatureRouter = Router();

asignatureRouter.get("/", getAsignatures);
asignatureRouter.post("/", createAsignature);
asignatureRouter.put("/:id", updateAsignature);
asignatureRouter.delete("/:id", deleteAsignature);
