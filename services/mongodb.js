const mongoose = require("mongoose");

const mongodbconnection = async () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.DB_HOST);
};
module.exports = mongodbconnection;
