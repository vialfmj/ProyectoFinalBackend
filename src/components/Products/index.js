const express = require('express')
const productsController = require ('./controller/productsController')
const {upload} = require("../../utils/middlewares/multer")
const isAuth = require('../../utils/middlewares/isAuth')

module.exports = app => {
    let router = express.Router()
    app.use('/api/productos', router)
    router.get('/', productsController.getAll)
    router.get('/:id',isAuth, productsController.getById)
    router.post('/',upload.single('image'), productsController.add)
    router.put("/:id", productsController.update)
    router.delete("/:id",productsController.delete)
} 