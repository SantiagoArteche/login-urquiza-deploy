import { decryptPassword } from "../../config/encrypt.js";
import { generateToken, verifyToken } from "../../config/jwt.js";
import { userModel } from "../../data/models/user.model.js";

export const login = async (request, response) => {
  const { password, email } = request.body;

  try {
    const findUser = await userModel.findOne({
      email,
    });

    if (!findUser) return response.json(`Usuario no encontrado`);

    if (!decryptPassword(password, findUser.password))
      return response.json(`Credenciales Incorrectas`);

    const token = await generateToken({ email }, "30m");

    return response
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 120,
      })
      .status(200)
      .json({ user: findUser, token });
  } catch (error) {
    return response.json({ error: error.toString() });
  }
};

export const validate = async (request, response) => {
  const { token } = request.params;

  if (token === null) return response.json({ error: "bad request" });
  try {
    const tokenData = token && (await verifyToken(token));
    return response.json({ msg: "User logged", tokenData });
  } catch (error) {
    return response.json({ error: error.toString() });
  }
};
