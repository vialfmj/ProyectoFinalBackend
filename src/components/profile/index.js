const express = require("express")
const profileController = require("./controller/profileController")
const isAuth = require("../../utils/middlewares/isAuth")
module.exports = app => {
    let Router = express.Router()
    app.use("/profile", Router)
    Router.get("/", isAuth, profileController.getProfile)
    Router.get("/misdatos", isAuth, profileController.getProfileData)
}