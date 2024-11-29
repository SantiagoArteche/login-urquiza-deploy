import mongoose from "mongoose";
import "dotenv/config";

export const initMongo = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "login-urq",
    })
    .then(() => {
      console.log("Mongo DB Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
