const Joi = require("joi");
const ValidateBodyBeforeSignUp = (schema) => {
  return (req, res, next) => {
    const { value, error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errorMessage = error.details
        ? error.details.map((detail) => detail.message).join(", ")
        : error.message;

      return res.status(400).json({ status: 2, message: errorMessage });
    }

    if (!req.value) {
      req.value = {};
    }
    req.value["body"] = value;
    next();
  };
};

const schemas = {
  signUpSchema: Joi.object().keys({
    user_name: Joi.string()
      .trim()
      .required()
      .messages({ "any.required": "user name is required" }),
    user_email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .messages({ "any.required": "please provide a validate email address" }),
    user_phone: Joi.number()
      .integer()
      .min(10 ** 9)
      .max(10 ** 10 - 1)
      .required()
      .messages({
        "number.min": "phone number should be 10 digits",
        "number.max": "phone number should be 10 digits",
        "string.empty": "phone number is required",
        "any.required": "phone number is required",
      }),
    user_profile: Joi.string()
      .required()
      .messages({ "any.required": "Please provide a profile name" }),
    user_address: Joi.string(),
    password: Joi.string()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,30}$"))
      .min(6)
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain at least 1 lowercase, 1 uppercase, 1 number and 1 special character.",
        "string.min": "Password must be at least 6 digits",
        "string.empty": "Password cannot be empty",
        "any.required": "Password is required",
      }),
  }),
  logInSchema: Joi.object().keys({
    user_email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .messages({ "any.required": "please provide a validate email address" }),

    password: Joi.string()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,30}$"))
      .min(6)
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain at least 1 lowercase, 1 uppercase, 1 number and 1 special character.",
        "string.min": "Password must be at least 6 digits",
        "string.empty": "Password cannot be empty",
        "any.required": "Password is required",
      }),
  }),
};

module.exports = {
  ValidateBodyBeforeSignUp,
  schemas,
};
