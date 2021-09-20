const jwt = require('jsonwebtoken')


function generateToken (user) {
     // expires after 35 minutes (2100 seconds = 35 minutes)
     const token = jwt.sign(user, process.env.TOKEN_SECRET, {
        expiresIn: "2100s"
      });
      return token;
}

function validateToken (req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
      return res.status(401).json({ message: "Unauthorized!" }); // if there isn't any token
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err != null && err.name == "JsonWebTokenError") {
        return res.status(401).send({ message: "Invalid Token!" });
      } else if (err != null && err.name == "TokenExpiredError") {
        return res.status(401).send({ message: "Token Expired!" });
      }
      next();
    });
}

function getUserFromToken (req) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401); // if there isn't token
    return jwt.decode(token);
}

module.exports = {getUserFromToken, validateToken, generateToken}