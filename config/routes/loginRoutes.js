import express from "express";
import { loginUser } from "../../src/api/v1/controllers/loginController.js";
import { validparameters } from "../../middlewares/validateParametersLogin.js";
const router = express.Router();

// REVISAR CON EL SWAGGER QUE NOSOTROS DEFINIMOS LO QUE VIENE A CONTINUACIÓN. ESTÁ ECHO, SOLO HAY QUE RESCATARLO

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: autenticación de usuarios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         email: example@test.com
 *         password: secretPassword
 */

/**
 * @swagger
 * /user/login:
    post:
      tags:
        - user
      summary: Logs user into the system
      description: User and Admin login
      operationId: loginUser
      parameters:
        - name: username
          in: query
          description: The user name for login
          required: false
          schema:
            type: string
        - name: password
          in: query
          description: The password for login in clear text
          required: false
          schema:
            type: string
      responses:
        '200':
          description: successful operation
          headers:
            X-Rate-Limit:
              description: calls per hour allowed by the user
              schema:
                type: integer
                format: int32
            X-Expires-After:
              description: date in UTC when token expires
              schema:
                type: string
                format: date-time
          content:
            application/xml:
              schema:
                type: string
            application/json:
              schema:
                type: string
        '400':
          description: Invalid username/password supplied
 */

router.post("/user/login", validparameters, loginUser);

export default router;



const baseURLLogin = "https://backend-backup-3tm8.onrender.com/api/v1/login";
// Rutas para login
// `${baseURL}/user/login`//post
