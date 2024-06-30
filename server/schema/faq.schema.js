const mongoose = require('mongoose')

const FaqSchema = new mongoose.Schema({
    type: String,
    title: String,
    content: String,
}, {
    versionKey: false,
    timestamps: true
})
module.exports = FaqSchema