
const ERRORS = [

  { code: "auth_01", status: 400, message: "El usuario no existe" },
  { code: "auth_02", status: 400, message: "Contraseña inválida" },
  { code: "auth_03", status: 401, message: "El token debe estar presente" },
  { code: "auth_04", status: 401, message: "El token no es válido" },
];

export default ERRORS;
