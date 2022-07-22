const session = require("express-session")
const logger = require("../../../utils/loggers/winston")
const LoginService = require("../service/loginService")
class LoginController {
    getLoginForm = (req,res,next) => {
        res.render("login")
    }
    login = async (req,res,next) => {
        try {
            let response = await LoginService.login(req.body)
            res.json(response)
        } catch (error) {
            logger.error(`Error: ${error}`)
        }

    }
}
module.exports = new LoginController()