const {Schema, model} = require("mongoose")
const productSchema = {
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    codigo: {
        type: String,
        required: true
    },
    imagenUrl: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
}
const schema3 = new Schema(productSchema,{
    timestamps: true,
    versionKey: false
});
let ProductModel = model("products", schema3)
module.exports = ProductModel