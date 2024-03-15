import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { byEmail } from ".././models/userModel.js";
import { findError } from "../utils/utils.js";

const loginUser = async (req, res) => {
  const { user } = req.body;
  try {
    const findUser = await byEmail(user);

    if (!findUser) {
      const errorFound = findError("auth_01");
      return res
        .status(errorFound[0].status)
        .json({ error: errorFound[0].message });
    } else {
      const isPasswordValid = bcrypt.compareSync(
        user.password,
        findUser.password
      );
      if (!isPasswordValid) {
        const errorFound = findError("auth_02");
        return res
          .status(errorFound[0].status)
          .json({ error: errorFound[0].message});
      } else {
        const { email, name, last_name } = findUser;

        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.status(200).json({
          message: `Bienvenido, ${name} ${last_name} has iniciado sesion`,
          code: 200,
          token,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { loginUser };
