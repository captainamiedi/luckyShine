const express = require("express");
const UserController = require("../controllers/userController")
const AuthValidateRequest = require('../middlewares/authValidator')
const credentialsValidation = require('../middlewares/credentialValidator')
const api_prefix = "/api/v1";
authRouter = express.Router();

authRouter.post(`${api_prefix}/authenticate`, [AuthValidateRequest.validate, credentialsValidation], UserController.User)

module.exports = authRouter;