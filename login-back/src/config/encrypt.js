import { hashSync, compareSync } from "bcrypt";
import "dotenv/config";

export const encryptPassword = (password) =>
  hashSync(password, Number(process.env.SALT));

export const decryptPassword = (password, passwordHash) =>
  compareSync(password, passwordHash);
