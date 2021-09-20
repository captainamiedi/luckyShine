const {generateToken} = require('../services/userTokenService')

class UserController {
    static User = (req, res) => {
        const user = res.locals.loggedInUser;
        const token = generateToken(user);
        res.json({ token: token });
    }
}

module.exports = UserController;