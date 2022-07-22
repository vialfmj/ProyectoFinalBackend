const express = require("express")
const Router = express.Router()

const isAuth = require("../../utils/middlewares/isAuth")

const ChatController = require("./controller/chatController")
module.exports = app => {
    app.use("/chat", Router)
    Router.get("/",isAuth, ChatController.getView)
    Router.get("/answer", ChatController.getAnswerView)
}