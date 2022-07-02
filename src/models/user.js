const {Schema, model} = require("mongoose")

const userSchema = {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    idCart: {
        type: String
    },
    avatar: {
        type: String,
        required: true
    },
    cartId: {
        type: String,
        required: true
    }
}

const schema3 = new Schema(userSchema,{
    timestamps: true,
    versionKey: false
});
let UserModel = model("users", schema3)
module.exports = UserModel