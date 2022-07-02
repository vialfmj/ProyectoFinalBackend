const productsService = require('../services/productsService')
class ProductsContainer {
    getAll = async (req,res,next)=>{
        let respuesta = await productsService.getAll()
        res.send(respuesta)
    }
    getById = async(req,res,next)=>{
        const {id} = req.params
        let respuesta = await productsService.getById(id)
        res.send(respuesta)
    }
    add = async(req,res,next)=>{
        let producto = req.body
        console.log("producto",producto)
        let respuesta = await productsService.add(producto)
        res.json(respuesta)
    }
    update =async(req,res,next)=>{
        let {id}= req.params
        let respuesta= await productsService.update(id,producto)
        res.json(respuesta)
    }
    delete = async(req,res,next)=>{
        let {id} = req.params
        let respuesta = await productsService.delete(id)
        res.json(respuesta)
    }
    
}
module.exports = new ProductsContainer()