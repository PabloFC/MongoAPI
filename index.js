const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const accountRouter = require("./routes/accountRouter");
const authRouter = require("./routes/authRouter");
const authSessionRouter = require("./routes/authSessionRouter");
const authTokenRouter = require("./routes/authTokenRouter");
const { default: mongoose } = require("mongoose");
const mongodbconnection = require("./services/mongodb");

//te permite coger las variables del .env
dotenv.config();
// te permite mirar el archivo y coger la variable
const PORT = process.env.PORT;
const app = express();
// middlewares para interpretar el formato json y text enviados desde el cliente por http
app.use(express.json());
app.use(express.text());
app.use(logger("dev"));
app.use(cookieParser());
// API middleware -----End Points
app.use("/account", accountRouter);
app.use("/auth", authRouter);
app.use("/auth-session", authSessionRouter);
app.use("/auth-token", authTokenRouter);
// Levantamos el servidor en el puerto 3000
const main = async () => {
  try {
    await mongodbconnection();
    console.log("Database connection OK!");
    app.listen(PORT, () => console.log(`Server in port ${PORT}`));
  } catch (e) {
    console.log("Error in database connection: ", e.message);
  }
};
main();
