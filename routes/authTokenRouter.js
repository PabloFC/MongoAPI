const { Router } = require("express");
const validateLoginDto = require("../dto/validateLoginDto");
const { login, getUser } = require("../controllers/authtokencontroller");

const authTokenRouter = Router();

authTokenRouter.post("/login", validateLoginDto, login);

authTokenRouter.get("/profile", getUser);

module.exports = authTokenRouter;
