const {Schema, model} = require("mongoose")


const cartSchema = {
    productos:{
        type: Array,
        require: true
    }
}

const newSchema = new Schema(cartSchema, {
    timestamps: true,
    versionKey: false
})

const CartModel = new model("cart", newSchema)


module.exports = CartModel