const models = require('../../models')
const bcrypt = require('bcryptjs')

const loginService = (req, res, next) => {
    const userDetail = models.users.getUserByEmail(req.body.email)

    userDetail.then(result => {
        if (result === null) {
          res.status(401).json({ message: "Unauthorized!" });
        } else {
          bcrypt.compare(req.body.password, result.password, () => {
            var user = {
              id: result.id,
              email: result.email,
              name: result.name
            };
            res.locals.loggedInUser = user;
            return next();
          });
        }
      })
      .catch(error => {
        res.status(401).json({ message: "Unauthorized!" });
      });
}

module.exports = loginService;