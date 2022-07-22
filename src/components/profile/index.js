const express = require("express")
const profileController = require("./controller/profileController")
const passport = require("passport")
const isAuth = require("../../utils/middlewares/isAuth")
module.exports = app => {
    let Router = express.Router()
    app.use("/profile", Router)
    Router.get("/", passport.authenticate("jwt",{ failureRedirect: '/login', successRedirect: '/profile/me' }))
    Router.get("/me",isAuth, profileController.getProfile)
    Router.get("/misdatos",isAuth, profileController.getProfileData)
    Router.get("/getmycart", isAuth, profileController.getMyCart)
}