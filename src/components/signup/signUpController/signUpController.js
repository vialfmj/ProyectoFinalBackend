const logger = require("../../../utils/loggers/winston")
const SignUpService = require("../signUpService/signUpService")
const CartService = require("../../cart/service/cartService")

class SignUpController {
    getForm = async(req,res,next) => {
        res.render("signup")
    }
    signUp = async (req, res, next) => {
        try {
            let imageToSave = ''
            let cartId = await CartService.addNewCart()
            if(req.file)
            imageToSave =`/assets/${req.file.filename}`
            req.body = {
                ...req.body,
                avatar: imageToSave,
                cartId: cartId
        }
           let response = await SignUpService.signUp(req.body)
           res.json(response)
        } catch (error) {
            res.json(error)
        }
    }
}
module.exports = new SignUpController()