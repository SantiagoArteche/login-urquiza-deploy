import { Router } from "express";
import { userRouter } from "./users/routes.js";
import { authRouter } from "./auth/routes.js";
import { asignatureRouter } from "./asignature/routes.js";
import { classRoomRouter } from "./classroom/routes.js";

export const router = Router();

router.use("/api/users", userRouter);
router.use("/api/auth", authRouter);
router.use("/api/asignature", asignatureRouter);
router.use("/api/classroom", classRoomRouter);
