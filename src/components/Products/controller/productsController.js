const productsService = require('../services/productsService')
const ObjectId = require('mongoose').Types.ObjectId;
class ProductsContainer {
    getAll = async (req,res,next)=>{
        let respuesta = await productsService.getAll()
        res.send(respuesta)
    }
    getById = async(req,res,next)=>{
        const {id} = req.params
        const isId = ObjectId.isValid(id)
        let respuesta = undefined
        if(isId === true)
        respuesta = await productsService.getById(id)
        if(isId === false)
        respuesta = await productsService.getByCategory(id)

        if(!respuesta)
            res.render("error") 
        
        if(respuesta && (isId === true))
            res.render("details", {respuesta})
        if(respuesta && (isId === false))
            res.send(respuesta)
    }
    add = async(req,res,next)=>{
        let imageToSave = ''
        if(req.file)
        imageToSave =`/assets/${req.file.filename}`
        req.body = {
            ...req.body,
            imagenUrl: imageToSave,
    }
        let producto = req.body
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