// Importamos express
const express = require("express");
const {
  getPublic,
  login,
  loginAtorizado,
} = require("../controllers/authController");
//Crea la ruta que va utilizar para hacer las peticiones
const authRouter = express.Router();
// Endpoint público (no autenticado y no autorizado)
authRouter.get("/public", getPublic);
// Endpoint autenticado para todo usuario registrado
authRouter.post("/autenticado", login);
// Endpoint autorizado a administradores
authRouter.post("/autorizado", loginAtorizado);

module.exports = authRouter;
