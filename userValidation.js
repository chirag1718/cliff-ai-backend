const Joi = require("@hapi/joi");

// Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(100).required(),
    email: Joi.string().min(6).max(100).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(data);
};

// Login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(100).required(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
