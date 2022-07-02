const express = require("express")
const {upload} = require("../../utils/middlewares/multer")
const passport = require("passport")


const SignUpController = require("./signUpController/signUpController")
const CartController = require("../cart/service/cartService")
module.exports =app => {
    let router = express.Router()
    app.use("/signup", router)
    router.get("/", (req,res,next) => {
        res.render("signup")
    })
    router.post('/',upload.single('avatar'),async (req,res,next) => {
        let cartId = await CartController.addNewCart()
        let imageToSave =`/assets/${req.file.filename}`
        req.body = {
            ...req.body,
            avatar: imageToSave,
            cartId: cartId
        }
        next()
    }, passport.authenticate('signup', {failureRedirect: 'signup', successRedirect:'/profile'}), );
}