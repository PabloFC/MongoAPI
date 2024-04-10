const checkEmailPassword = require("../../10_express_api_5/utils/checkEmailPassword");
const { SignJWT, jwtVerify } = require("jose");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(400);

  try {
    const { _id } = await checkEmailPassword(email, password);

    const jwtConstructor = new SignJWT({ guid: _id });
    const encoder = new TextEncoder();
    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(encoder.encode(process.env.JWT_SECRET));
    console.log(jwt);
    return res.send({ jwt });
  } catch (err) {
    console.log(err);
    return res.sendStatus(401);
  }
};

const getUser = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401);
  try {
    const token = authorization.split(" ")[1];
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      token,
      encoder.encode(process.env.JWT_SECRET)
    );
    const user = user.findOne({ _id: payload.guid });
    if (!user) return res.sendStatus(401);
    delete user.password;
    return res.send(user);
  } catch (err) {
    console.log(err);
    return;
  }
};
module.exports = { login, getUser };
