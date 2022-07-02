const logger = require("../../../utils/loggers/winston")
const productsService = require("../../Products/services/productsService")
const CartService = require("../service/cartService")

class CartController {
    getCartPage = async (req, res, next) => {
        let { idCart } = req.params
        let cart = await CartService.getCart(idCart)
        res.render("cart", { 
            cart: cart,
            idCart: idCart
        })
    }
    addNewCart = async (req, res, next) => {
        let id = await CartService.addNewCart()
        res.json({ id: id })
    }
    getCart = async (req, res, next) => {
        let { idCart } = req.params
        let cart = await CartService.getCart(idCart)
        res.json({ cart: cart })
    }
    addToCart = async (req, res, next) => {
        try {
            let {idCart, idProd} = req.query
            let response = await CartService.addToCart(idProd, idCart)
            res.redirect("/profile")
        } catch (error) {
            logger.error("Error al añadir producto")
        }
    }
    removeFromCart = async (req,res,next) => {
        try {
            let {idCart, idProd} = req.query
            let response = await CartService.removeFromCart(idProd, idCart)
            res.redirect(`/api/cart/micarrito/${idCart}`)
        } catch (error) {
            logger.error("error al remover del carrito")
        }
    }
    buy = async (req,res,next) => {
        let {idCart} = req.query
        let {email} = req.user
        let {phone} = req.user
        await CartService.buy(idCart, email, phone)
        res.render("buy")
    }
}

module.exports = new CartController()