import googleVerify from "../helpers/google.js";
import jwt from "jsonwebtoken";
import { byEmail } from ".././models/userModel.js";
import { findError } from "../utils/utils.js";

const loginGoogle = async (req, res) => {
  const { google } = req.body;
  try {
    const id_token = google.credential;
    if (id_token === undefined || id_token == "")
      res.status(400).json({ msg: "falta jwt" });
    const { name, email } = await googleVerify(id_token);

    const findUser = await byEmail({ email });

    if (!findUser) {
      const errorFound = findError("auth_01");
      return res
        .status(errorFound[0].status)
        .json({ error: errorFound[0].message });
    } else {
      const { email, name, last_name, rut, is_banned } = findUser;

      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "30min"
      });
      res.status(200).json({
        message: `Bienvenido, ${name} ${last_name} has iniciado sesion`,
        user_name: name,
        user_last_name: last_name,
        id: rut,
        status: is_banned,
        code: 200,
        token
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { loginGoogle };
