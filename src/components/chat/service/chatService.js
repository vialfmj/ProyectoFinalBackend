const MessageModel = require("../../../models/message")

class ChatService {
    getAll =() => {
        return "hola desde chatService"
    }
    getMessage = async (id) => {
        let message = await MessageModel.findById(id)
        return message
    }
}

module.exports = new ChatService()