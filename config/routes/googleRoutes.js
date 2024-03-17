import express from "express";
import { loginGoogle } from "../../src/api/v1/controllers/googleController.js";
import { validparameters } from "../../middlewares/validateParamsGoogle.js";
const router = express.Router();

router.post("/user/login", validparameters, loginGoogle);

export default router;
