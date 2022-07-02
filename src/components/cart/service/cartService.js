const mongoose = require("mongoose")
const {accountSid, authToken} =require("../../../config").twilio
const client = require('twilio')(accountSid, authToken);
const CartModel = require("../../../models/cart")
const ProductModel = require("../../../models/product")
const logger = require("../../../utils/loggers/winston")
const productsService = require("../../Products/services/productsService")
const transporter = require("../../../utils/nodemailer/transporter")

class CartService {
    generateId = () => Math.random().toString(36)

    enviarEmail = async (mailOptions) => {
        try {
            const info = await transporter.sendMail(mailOptions)
            console.log(info)
        } catch (error) {
            console.log(error)
        }
    }
    enviarSms = (phone) => {
            client.messages
            .create({
                body: `Su pedido ha sido confirmado`,
                from: '+19896012784',
                to: `${phone}`
            })
            .then(message => console.log(message.sid))
            .done()
    }
    enviarWsp = (email, newProductos) => {
        client.messages
            .create({
                body: `Nuevo pedido de: ${email}: ${JSON.stringify(newProductos)}`,
                from: 'whatsapp:+14155238886',
                to: 'whatsapp:+5492612511585'
            })
            .then(message => console.log(message.sid))
            .done();
    }
    addNewCart = async () => {
        try {
            const newCart = await CartModel()
            const resultado = await newCart.save()
            const { id } = resultado
            return `${id}`
        } catch (error) {
            logger.error(`error en CartService/addNewCart`)
        }
    }
    getCart = async (id) => {
        try {
            const { productos } = await CartModel.findOne({ _id: id }).lean()
            return productos
        } catch (error) {
            logger.error(error)
        }
    }
    addToCart = async (idProd, idCart) => {
        let product = await productsService.getById(idProd)
        let productToAdd = {
            nombre: product.nombre,
            descripcion: product.descripcion,
            precio: product.precio,
            id: this.generateId()
        }
        let cart = await CartModel.findOne({ _id: idCart }).lean()
        cart.productos = [
            ...cart.productos,
            productToAdd
        ]
        await CartModel.findByIdAndUpdate(idCart, { productos: cart.productos })
        return
    }
    removeFromCart = async (idProd, idCart) => {
        try {
            let cart = await CartModel.findById(idCart).lean()
            let { productos } = cart
            let newProductos = productos.filter(producto => producto.id !== idProd)
            await CartModel.findByIdAndUpdate(idCart, { productos: newProductos })
            return "se quito el producto"

        } catch (error) {
            logger.error(error)
        }
    }
    buy = async (idCart, email, phone) => {
        let productos = await this.getCart(idCart)
        let newProductos = []
        productos.forEach(producto => {
            newProductos = [
                ...newProductos,
                {
                    producto: producto.nombre,
                    precio: producto.precio
                }
            ]
        })

        const mailOptions = {
            from: 'ServidorNodeJs',
            to: `testmailfranco@gmail.com`,
            subject: `Nuevo pedido de: ${email}`,
            html: JSON.stringify(newProductos)
        }

        this.enviarSms(phone)
        this.enviarWsp(email, newProductos)
        await this.enviarEmail(mailOptions)
    }
    /* 
const mailOptions = {
    from: 'ServidorNodeJs',
    to: 'testmailfranco@gmail.com',
    subject: 'Mail de prueba',
    html: "Hola este es un mail de prueba"
}
try {
    (async () => {
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    })();
} catch (error) {
    console.log(error)    
} */
}

module.exports = new CartService