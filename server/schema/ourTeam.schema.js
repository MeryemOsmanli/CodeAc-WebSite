const mongoose = require('mongoose')

const OurTeamSchema = new mongoose.Schema({
    image: String,
    title: String,
    content: String,

}, { versionKey: false, timestamps: true })

module.exports = OurTeamSchema