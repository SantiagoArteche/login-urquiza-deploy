import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (payload, hours = "2h") => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.PRIVATE,
      { expiresIn: hours },
      (error, token) => {
        if (error) reject("Error creating token");

        resolve(token);
      }
    );
  });
};

export const verifyToken = (token) => {
  return new Promise((resolve) => {
    jwt.verify(token, process.env.PRIVATE, (error, decode) => {
      if (error) reject(error);

      resolve(decode);
    });
  });
};
