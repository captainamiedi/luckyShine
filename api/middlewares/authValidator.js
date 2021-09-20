const { check, validationResult } = require("express-validator");

const createValidators = () => [
  check("email", { email: "Invalid email" })
    .isEmail()
    .normalizeEmail(),
  check("password", { password: "Invalid password" }).isLength({ min: 6 })
];

const reveal = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(422).json({
      errors: errorMessages
    });
  }
  next();
};

module.exports = {
  validate: [createValidators(), reveal]
};