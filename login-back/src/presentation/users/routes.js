import { Router } from "express";
import {
  createUser,
  getUserById,
  putUser,
  deleteUser,
  getAllUsers,
  forgetPassword,
  newPassword,
} from "./controller.js";

export const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", createUser);
userRouter.put("/:id", putUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/recover", forgetPassword);
userRouter.post("/changepassword", newPassword);
