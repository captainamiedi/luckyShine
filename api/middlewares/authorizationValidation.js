const {validateToken} = require('../services/userTokenService')

function authorizationRequest (req, res, next) {
    validateToken(req, res, next)
}

module.exports = authorizationRequest;