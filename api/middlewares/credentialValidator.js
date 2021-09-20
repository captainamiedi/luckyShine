const loginService = require("../services/loginService");

function validateCredentials(req, res, next) {
  loginService(req, res, next);
}

module.exports = validateCredentials;