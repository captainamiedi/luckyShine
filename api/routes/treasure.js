const express = require("express");
const treasureController = require("../controllers/treasureController")
const authorizationRequest = require('../middlewares/authorizationValidation');
const treasureValidator = require("../middlewares/treasureValidator");
const api_prefix = "/api/v1";
treasureRouter = express.Router();

treasureRouter.use(api_prefix, authorizationRequest);

treasureRouter.post(`${api_prefix}/treasures`, [treasureValidator.validate], treasureController.getTreasure)
treasureRouter.post(`${api_prefix}/claim/treasure`, treasureController.claimTreasureController)

module.exports = treasureRouter