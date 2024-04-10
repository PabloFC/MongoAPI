const checkEmailPassword = require("../utils/checkEmailPassword");

const getPublic = (req, res) => res.send("Endpoint publico");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);
  try {
    const user = await checkEmailPassword(email, password);

    return res.send(`Usuario ${user.name} autenticado`);
  } catch (err) {
    return res.sendStatus(401);
  }
};

const loginAtorizado = async (req, res) => {
  // Obtenemos el email y password del body
  const { email, password } = req.body;
  // Si no existe alguno de esos dos campos devolvemos y 400(bad request)
  if (!email || !password) return res.sendStatus(400);
  // Buscamos el email entre las cuentas
  try {
    // Llamamos a la función de validar el email y password
    const user = await checkEmailPassword(email, password);
    // Si el rol del usuario no es administrador devolvemos un 403 (Forbidden)
    if (user.role !== "admin") return res.sendStatus(403);
    //Si todo es correcto enviamos la respuesta. 200 OK
    return res.send(`Usuario administrador ${user.name}`);
  } catch (err) {
    // Si el usuario no existe enviamos un 401 (unauthorized)
    return res.sendStatus(401);
  }
};
module.exports = { getPublic, login, loginAtorizado };
