import { encryptPassword } from "../../config/encrypt.js";
import { generateToken, verifyToken } from "../../config/jwt.js";
import { Nodemailer } from "../../config/nodemailer.js";
import { userModel } from "../../data/models/user.model.js";
import "dotenv/config";

export const getAllUsers = async (request, response) => {
  try {
    const users = await userModel.find();

    return response.json(users);
  } catch (error) {
    return response.json({ error: error.toString() });
  }
};

export const getUserById = async (request, response) => {
  const { id } = request.params;

  try {
    const findUser = await userModel.findById(id);

    return response.json(findUser);
  } catch (error) {
    return response.json({ error: error.toString() });
  }
};

export const getUserByEmail = async (request, response) => {
  const { email } = request.params;

  try {
    const findUser = await userModel.findOne({ email });

    return response.json(findUser);
  } catch (error) {
    return response.json({ error: error.toString() });
  }
};

export const createUser = async (request, response) => {
  const { name, role, email, password, career } = request.body;

  const findUser = await userModel.findOne({ email });

  if (findUser) {
    return response.json({ error: "Ya existe un usuario con ese documento" });
  }

  try {
    const newUser = await userModel.create({
      name,
      role,
      email,
      career,
      password: encryptPassword(password.toString()),
    });

    return response.json(newUser);
  } catch (error) {
    return response.json({ error: error.toString() });
  }
};

export const deleteUser = async (request, response) => {
  const { id } = request.params;

  const deleteUser = await userModel.findByIdAndDelete(id);

  if (!deleteUser) {
    return response.json("User with id " + id + " not found");
  }

  return response.json(`User with id ${id} was deleted`);
};

export const putUser = async (request, response) => {
  const { id } = request.params;
  const { name, email, password } = request.body;

  try {
    const userFound = await userModel.findById(id);

    if (!userFound) return response.json(`User with id ${id} not found`);

    const updateUser = await userModel.findByIdAndUpdate(id, {
      name: name && name,
      email: email && email,
      password: encryptPassword(password.toString()),
    });

    return response.json(updateUser);
  } catch (error) {
    return response.json({ error: error.toString() });
  }
};

export const forgetPassword = async (request, response) => {
  const { email } = request.body;

  try {
    const sendEmail = await sendEmailRecover(email);

    if (!sendEmail) throw new Error("Error enviando el email");

    return response.json({
      msg: `Email para recuperar la contraseña enviado a: ${email}`,
    });
  } catch (error) {
    return response.json({ error: error.toString() });
  }
};

export const newPassword = async (request, response) => {
  const { password, token } = request.body;
  try {
    const { email } = await verifyToken(token);

    const findUser = await userModel.findOne({ email });

    if (!findUser) {
      return response.json(`El usuario con el email ${email} no existe!`);
    }

    await userModel.findByIdAndUpdate(findUser.id, {
      password: encryptPassword(password),
    });

    return response.json({
      msg: "Contraseña cambiada exitosamente!",
    });
  } catch (error) {
    return response.json({ error: error.toString() });
  }
};

const sendEmailRecover = async (email) => {
  const token = await generateToken({ email });
  const link = `https://login-urquiza.vercel.app/newpassword/${token}`;

  const nodemailer = new Nodemailer(
    process.env.SERVICE,
    process.env.SENDER_EMAIL,
    process.env.SENDER_PASS
  );

  const isSent = await nodemailer.sendEmail({
    subject: "Recuperar Contraseña",
    to: email,
    htmlBody: `<h1>Clickea el siguiente link para recuperar tu contraseña<h1>
    <a href="${link}">Recuperar contraseña: ${email}</a> `,
  });

  if (!isSent) throw new Error("Error enviando el email");

  return true;
};
