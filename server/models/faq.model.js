const mongoose = require('mongoose');
const FaqSchema = require('../schema/faq.schema');

const FaqModel = mongoose.model('Faq', FaqSchema)
module.exports = FaqModel