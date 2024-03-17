import express from "express";
import cors from "cors";
import { logger } from "logger-express"; //comentar cuando se testee
import productRoutes from "./config/routes/productRoutes.js";
import loginRoutes from "./config/routes/loginRoutes.js";
import userRoutes from "./config/routes/userRoutes.js";
import googleRoutes from "./config/routes/googleRoutes.js";
// import{V1SwaggerDocs } from './v1/swagger'

const app = express();
// swagger
app.use(cors());
//app.options("*", cors());
app.use(express.json());
app.use("/api/v1/store", productRoutes);
app.use("/api/v1/login", loginRoutes);
app.use("/api/v1/google", googleRoutes);
app.use("/api/v1", userRoutes);

app.use(logger());
app.use((err, req, res, next) => {
  return res.status(500).json({
    status: "error",
    message: err.message + "... and is bad"
  });
});

// const PORT = 3001 // for tesing
const PORT = process.env.PORT;

app.listen(PORT, (error) => {
  if (error) {
    console.log("CHECK THIS!!!: ", error);
  } else {
    console.log(` Using:  http://localhost:${PORT}`);
    // console.log(`Swagger docs available at http://localhost:${PORT}/api/v1/docs`);
  }
  // V1SwaggerDocs(app, PORT)
});

export default app;
