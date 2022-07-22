const mongoose = require("mongoose")
const CartModel = require("../../../models/cart")
const logger = require("../../../utils/loggers/winston")
const productsService = require("../../Products/services/productsService")
const transporter = require("../../../utils/nodemailer/transporter")
const {ADMIN_EMAIL} = require("../../../config").config
const OrderModel = require("../../../models/order")

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
    addToCart = async (idProd, idCart, quantity) => {
        let product = await productsService.getById(idProd)
        let productToAdd = {
            nombre: product.nombre,
            descripcion: product.descripcion,
            precio: product.precio,
            cantidad: quantity,
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
        let orders = await OrderModel.find()
        let orderNumber = orders.length
        let newProductos = []
        const date = new Date()
        const fecha = date.toLocaleDateString()
        const hora = date.toLocaleTimeString()
        const fyh = `El dia: ${fecha} a las ${hora}`

        productos.forEach(producto => {
            newProductos = [
                ...newProductos,
                {
                    producto: producto.nombre,
                    precio: producto.precio,
                    cantidad: producto.cantidad
                }
            ]
        })
        try {
            let newOrder = await OrderModel({
                "Ítems": newProductos,
                "Número de orden": orderNumber,
                "Fecha y hora": fyh,
                "estado": 'generada',
                "Email de quien realizo la orden": email

            })
            await newOrder.save()
        } catch (error) {
            logger.error(`error saving newOrder${error}`)
        }
        const mailOptions = {
            from: 'ServidorNodeJs',
            to: ADMIN_EMAIL,
            subject: `Nuevo pedido numero ${orderNumber}de: ${email}`,
            html: JSON.stringify(newProductos)
        }
        const userMailOptions = {
            from: 'ServidorNodeJs',
            to: email,
            subject: `Tu pedido numero ${orderNumber} fue procesado con exito!`,
            html: JSON.stringify(newProductos)
        }
        try {
            (async () => {
                const info = await transporter.sendMail(mailOptions)
                logger.info(info)
            })();
            (async () => {
                const info = await transporter.sendMail(userMailOptions)
                logger.info(info)
            })();
        } catch (error) {
            logger.error(`Error in cartService.buy: ${error}`)    
        }
        
    }
}

module.exports = new CartService