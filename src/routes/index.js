const express = require("express")
const loginApi = require('../components/login')
const signUpApi = require("../components/signup")
const productsApi = require("../components/Products")
const cartApi = require("../components/cart")
const profileApi = require("../components/profile")
const chatApi = require("../components/chat")
const adminApi = require("../components/admin")
const setupApi = require("../components/setup")
const isAuth = require("../utils/middlewares/isAuth")

module.exports = app => {
    cartApi(app)
    loginApi(app)
    signUpApi(app)
    productsApi(app)
    profileApi(app)
    chatApi(app)
    adminApi(app)
    setupApi(app)

    app.get("/",isAuth, (req,res,next) => {
        res.redirect("/profile/me")
    })
}