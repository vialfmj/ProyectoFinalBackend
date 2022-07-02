const mongoose = require("mongoose")

const ProductoModel = require("../../../models/product")



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
            console.log(error, "error in MongoDbContainer: getAll()")
        }
    }
    getById = async (id) => {
        try {
            const res = await ProductoModel.findById(id)
            return res
        } catch (error) {
            console.log(error, "error in MongoDbContainer: getById()")
        }
    }
    add = async (product) => {
        try {
            const newProduct = ProductoModel(product)
            const newProductSaved = await newProduct.save()
            return `producto agregado con el id:${newProductSaved._id}`

        } catch (error) {
            console.log(error)
        }
    }
    update = async (id, updatedProduct) => {
        try{
            await ProductoModel.findByIdAndUpdate(id, updatedProduct)
            return `se modifico el producto con id: ${id}`
        }catch(error){
            console.log(error)
        }

    }
    delete = async (id) => {
        try {
            await ProductoModel.findByIdAndDelete(id)
            return `se elimino el producto: ${id}`
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new productsService()


