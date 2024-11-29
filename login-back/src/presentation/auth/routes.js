import { Router } from "express";
import { login, validate } from "./controller.js";

export const authRouter = Router();

authRouter.post("/login", login);
authRouter.get("/verify/:token", validate);
