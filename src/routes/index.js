const express = require("express")
const loginApi = require('../components/login')
const signUpApi = require("../components/signup")
const productsApi = require("../components/Products")
const cartApi = require("../components/cart")
const profileApi = require("../components/profile")

module.exports = app => {
    cartApi(app)
    loginApi(app)
    signUpApi(app)
    productsApi(app)
    profileApi(app)


    app.get("/", (req,res,next) => {
        res.render("index")
    })
}