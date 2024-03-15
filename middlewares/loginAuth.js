import { findError } from "../src/api/v1/utils/utils.js";
import jwt from "jsonwebtoken";

export const loginProtect = async (req, res, next) => {

  try {
    if (!req.header("Authorization")) {
      return res
        .status(401)
        .json({ error: "Token inválido o no proporcionado" });
    } else {
      const token = req.header("Authorization").split(" ")[1];
      const tokenData = await validateToken(token);
      req.user = tokenData;
      next();
    }
  } catch (error) {
      console.error(error, "->", error.message);
    return res
    .status(401)
    .json({ error: "Token inválido" });
  }
};

export const validateToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
      throw new Error('error: "Token inválido on validate token" ', error)
  }
};
