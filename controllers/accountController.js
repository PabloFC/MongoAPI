const { USERS_BBDD } = require("../bbdd");
const userModel = require("../services/schemas/userSchema");

const getUser = async (req, res) => {
  const { guid } = req.params;
  // Buscamos los detalles de la cuenta a través del guid recibido por req.params
  const user = await userModel.findById(guid);
  // Si no existe el usuario respondemos con un 404 (not found)
  if (!user) return res.status(404).send("La cuenta no existe");
  // Si existe respondemos con los detalles de la cuenta
  return res.send(user);
};

const addUser = async (req, res) => {
  //si no existe guid y name recibidos por el body devolvemos un 400 (bad request)
  const { guid, name, email, password, role } = req.body;
  //Buscamos los detalles de la cuenta atraves del guid recibi por req.params
  if (!guid || !name) return res.status(400).send();

  const user = await userModel.findById(guid);
  // si existe el usuario respondemos con un 409
  if (user) return res.status(409).send("La cuenta ya existe");
  const newUser = new userModel({
    _id: guid,
    name: name,
    email: email,
    password: password,
    role: role,
  });
  await newUser.save();
  return res.sendStatus(201);
};

const updateUser = async (req, res) => {
  const { guid } = req.params;
  const { name } = req.body;

  if (!name) return res.sendStatus(400);

  const user = await userModel.findById(guid);

  if (!user) return res.status(404).send("La cuenta no existe");

  user.name = name;
  await user.save();
  return res.status(201).send("Usuario actualizado");
};

const deleteUser = async (req, res) => {
  const { guid } = req.params;

  if (guid === -1) return res.status(404).send("La cuenta no existe");

  const user = await userModel.findById(guid);

  await user.deleteOne();
  return res.status(201).send("Usuario borrado");
};
module.exports = { getUser, addUser, updateUser, deleteUser };
