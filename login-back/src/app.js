import express from "express";
import { router } from "./presentation/routes.js";
import { initMongo } from "./data/mongoDB/init.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

const PORT = 7000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET));
app.use(cors());

initMongo();
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
