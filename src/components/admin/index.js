
const express = require("express")
const isAuth = require("../../utils/middlewares/isAuth")
const {upload} = require("../../utils/middlewares/multer")
const Router = express.Router()

module.exports = app => {
    app.use("/api/admin", Router)
    Router.get("/", isAuth,(req,res) => {
        res.render("admin")
    })
}
