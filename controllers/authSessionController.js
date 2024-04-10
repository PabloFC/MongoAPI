const checkEmailPassword = require("../../10_express_api_5/utils/checkEmailPassword");
const { v4: uuidv4 } = require("uuid");
const { USERS_BBDD } = require("../bbdd");
const sessions = [];

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(400);

  try {
    const { guid } = await checkEmailPassword(email, password);
    const sessionId = uuidv4();
    sessions.push({ guid, sessionId });
    res.cookie("sessionId", sessionId, { httpOnly: true });
    return res.send(`Usuario logueado`);
  } catch (err) {
    return res.sendStatus(401);
  }
};

const getUser = async (req, res) => {
  const { cookies } = req;
  if (!cookies.sessionId) return res.sendStatus(401);
  const userSession = sessions.find(
    (session) => session.sessionId === cookies.sessionId
  );
  if (!userSession) return res.sendStatus(401);
  const user = await user.findOne({ _id: userSession.guid });
  if (!user) return res.sendStatus(401);
  return res.send(user);
};
module.exports = { login, getUser };
