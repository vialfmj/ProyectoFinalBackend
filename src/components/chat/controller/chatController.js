const ChatService = require("../service/chatService")


class ChatController {
    getAll = (req, res, next) => {
        let response = ChatService.getAll()
        res.json({response})
    }
    getView = (req,res) => {
        let data = {
            email: req.user.email,
        }
        res.render("chat", {data})
    }
    getAnswerView = async (req,res) => {
        const { msg } = req.query
        let message = await ChatService.getMessage(msg)
        res.render("answer_view" , {message})
    }
}

module.exports = new ChatController()