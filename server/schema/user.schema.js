const mongoose = require('mongoose')
const ProductModel = require('../models/product.model')
const UserSchema = new mongoose.Schema({
    fullName: String,
    username: String,
    gmail: String,
    profileImage: String,
    isAdmin: Boolean,
    isLogin: Boolean,
    password: String,
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
    basket: [{}],

}, { versionKey: false, timestamps: true })


module.exports = UserSchema