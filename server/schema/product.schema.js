const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    images: String,
    type: String,
    cal: String,
    flavour: String

}, { versionKey: false, timestamps: true })


module.exports = ProductSchema