const {Schema, model} = require("mongoose")


const messageSchema = {
    email: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    fyh: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    answers:{
        type: Array,
        require: true
    }
}

const MessageModel = new model("messages",messageSchema)

module.exports = MessageModel