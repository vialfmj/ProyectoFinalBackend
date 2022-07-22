const express = require("express")
const {upload} = require("../../utils/middlewares/multer")
const passport = require("passport")


const SignUpController = require("./signUpController/signUpController")
const CartController = require("../cart/service/cartService")
module.exports =app => {
    let router = express.Router()
    app.use("/signup", router)
    router.get("/", SignUpController.getForm)
    router.post("/", upload.single('avatar'), SignUpController.signUp)
}