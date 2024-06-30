const ProductModel = require("../models/product.model");

const ProductController = {
    getAll: async (req, res) => {
        try {
            const products = await ProductModel.find({})
            res.status(200).send(products)

        } catch (err) {
            res.status(404).send('Error In Getting All Products' + err)
        }
    },
    getOne: async (req, res) => {
        try {
            const { id } = req.params
            const product = await ProductModel.findById(id)
            res.status(200).send(product)

        } catch (err) {
            res.status(404).send('Error In Getting One Product' + err)
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const deleteProduct = await ProductModel.findByIdAndDelete(id)
            res.send(deleteProduct)

        } catch (err) {
            res.status(404).send('Error In Deleting Product' + err)
        }
    },
    add: async (req, res) => {
        try {
            const {
                title,
                description,
                price,
                images,
                type,
                cal,
                flavour

            } = req.body
            const newProduct = new ProductModel({
                title: title.trim(),
                description: description.trim(),
                price: price,
                images: images.trim(),
                type: type.trim(),
                cal: cal.trim(),
                flavour: flavour.trim()
            })
            await newProduct.save()
            res.status(200).send(newProduct)
        } catch (err) {
            res.status(404).send('Error In Posting Product' + err)
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params
            const {
                title,
                description,
                price,
                images,
                type,
                cal,
                flavour
            } = req.body

            await ProductModel.findByIdAndUpdate(id, {
                title: title.trim(),
                description: description.trim(),
                price: price,
                images: images.trim(),
                type: type.trim(),
                cal: cal.trim(),
                flavour: flavour.trim()
            })
            const updateProduct = await ProductModel.findById(id)
            res.status(200).send(updateProduct)
        } catch (err) {
            res.status(404).send('Error In Editing Product' + err)
        }
    },
}

module.exports = ProductController;