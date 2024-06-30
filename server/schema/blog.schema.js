const mongoose = require('mongoose')


const BlogSchema = new mongoose.Schema({
    title: String,
    image: String,
    posterTitle: String,
    tags: String,
    description: [],
    content: String,
}, { versionKey: false, timestamps: true })
module.exports = BlogSchema