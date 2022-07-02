const express = require("express")
const isAuth = require("../../utils/middlewares/isAuth")
const cartController = require("./controller/cartController")

module.exports = app => {
    let Router = express.Router()
    app.use("/api/cart", Router)
    Router.get("/micarrito/:idCart", isAuth, cartController.getCartPage)
    Router.post("/", isAuth, cartController.addNewCart)
    Router.get("/addToCart", isAuth, cartController.addToCart)
    Router.get("/removeFromCart", isAuth, cartController.removeFromCart)
    Router.get("/buy", isAuth, cartController.buy)
}