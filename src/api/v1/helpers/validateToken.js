import jwt from "jsonwebtoken";
import { findError } from "../utils/utils.js";

export const validateToken = async (token) => {
    console.log("aqui esta el jwt")
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      findError("auth_04");
    }
  };