import ERRORS from  "../helpers/errors.js";
// VERIFICAR SI ESTO CONVERSA CON EL CÓDIGO DE ALBA RESPECTO AL MANEJO DE ERRORES
const findError = (code) => {
  return ERRORS.filter((err) => err.code == code);
}

export { findError }