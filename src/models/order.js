const {Schema, model} =require("mongoose")

const orderSchema = {
    "Ítems":{
        type: Array,
    },
    "Número de orden": {
        type: Number
    },
    "Fecha y hora": {
        type: String
    },
    estado: {
        type: String
    },
    "Email de quien realizo la orden": {
        type: String
    }
}
const newSchema = new Schema(orderSchema, {
    timestamps: false,
    versionKey: false
})
const OrderModel = new model("order", newSchema)

module.exports = OrderModel