const { Type } = require("@sinclair/typebox");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const addErrors = require("ajv-errors");

const LoginDTOSchema = Type.Object(
  {
    email: Type.String({
      format: "email",
      errorMessage: {
        type: "El tipo de email debe ser un string",
      },
    }),
    password: Type.String({
      errorMessage: {
        type: "El tipe de password debe ser un string",
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      type: "Debe ser un objeto",
      additionalProperties: "El fromato del objeto no es valido",
      required: {
        email: "El email es requerido",
        password: "La password es requerido",
      },
    },
  }
);

const ajv = new Ajv({ allErrors: true });
addFormats(ajv, ["email"]);
addErrors(ajv, { keepErrors: false });

const validate = ajv.compile(LoginDTOSchema);

const validateLoginDto = (req, res, next) => {
  // le pasamos la funciónd e validación
  const isDTOValid = validate(req.body);
  // Si no ha pasado la validación enviamos un 400
  if (!isDTOValid)
    return res
      .status(400)
      .send(ajv.errorsText(validate.errors, { separator: "\n" }));
  next();
};

module.exports = validateLoginDto;
