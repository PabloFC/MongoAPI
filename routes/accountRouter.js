//importamos express
const express = require("express");
//importamos el archivo bbdd.js
const accountRouter = express.Router();
//Creamos un router

const {
  getUser,
  deleteUser,
  updateUser,
  addUser,
} = require("../controllers/accountController.js");

accountRouter.use((req, res, next) => {
  console.log(
    "Se ejecuta nuestra funcion definida en el middleware de account"
  );
  next();
});
// Obtener los detalles de una cuenta a partir del guid
accountRouter.get("/:guid", getUser);

accountRouter.post("/", addUser);

accountRouter.patch("/:guid", updateUser);

accountRouter.delete("/:guid", deleteUser);

module.exports = accountRouter;
