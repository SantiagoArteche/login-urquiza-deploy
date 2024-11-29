import express from "express";
import { router } from "./presentation/routes.js";
import { initMongo } from "./data/mongoDB/init.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

const PORT = 7000;
const app = express();

const whiteList = ["https://login-urquiza.vercel.app"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) != -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Acceso denegado"));
    }
  },
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET));
app.use(cors(corsOptions));

initMongo();
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
