const express = require("express");

const { login, getUser } = require("../controllers/authsessionController");

const authSessionRouter = express.Router();

authSessionRouter.post("/login", login);

authSessionRouter.get("/profile", getUser);

module.exports = authSessionRouter;
