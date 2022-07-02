const express = require('express')
const productsController = require ('./controller/productsController')
module.exports = app => {
    let router = express.Router()
    app.use('/api/productos', router)
    router.get('/', productsController.getAll)
    router.get('/:id', productsController.getById)
    router.post('/', productsController.add)
    router.put("/:id", productsController.update)
    router.delete("/:id",productsController.delete)
}