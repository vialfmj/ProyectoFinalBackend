const mongoose = require("mongoose")

const ProductoModel = require("../../../models/product")
const logger = require("../../../utils/loggers/winston")



class productsService {
    getAll = async () => {
        try {
            let lectura = await ProductoModel.find({})
            let newArray = []
            lectura.forEach( element => {
                newArray = [
                    ...newArray,
                    {
                        nombre: element.nombre,
                        descripcion: element.descripcion,
                        imagen: element.imagenUrl,
                        precio: element.precio,
                        stock: element.stock,
                        id: element.id
                    }
                ]
            })
            return newArray
        } catch (error) {
            logger.error( "error in getAll():", error)
        }
    }
    getById = async (id) => {
        try {
            const res = await ProductoModel.findById(id)
            return res
        } catch (error) {
            console.log( "error in  getById():",error)
        }
    }
    getByCategory = async(category) => {
        try {
            const res = await ProductoModel.find({categoria:category})
            if(!(res.length > 0))
                res = undefined
            return res
        } catch (error) {
            logger.error("error en getByCategory():", error)
        }
    }
    add = async (product) => {
        try {
            const newProduct = ProductoModel(product)
            const newProductSaved = await newProduct.save()
            return `producto agregado con el id:${newProductSaved._id}`

        } catch (error) {
            logger.error("error in add():",error)
        }
    }
    update = async (id, updatedProduct) => {
        try{
            await ProductoModel.findByIdAndUpdate(id, updatedProduct)
            return `se modifico el producto con id: ${id}`
        }catch(error){
            logger.error("error in update():" , error)
        }

    }
    delete = async (id) => {
        try {
            await ProductoModel.findByIdAndDelete(id)
            return `se elimino el producto: ${id}`
        } catch (error) {
            logger.error("error in delete():" , error)
        }
    }
}

module.exports = new productsService()


