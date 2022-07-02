const session = require("express-session")
let users = []

class LoginController {
    getLoginForm = (req,res,next) => {
        res.render("login")
    }
}
module.exports = new LoginController()