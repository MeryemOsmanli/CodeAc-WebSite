const mongoose = require('mongoose')
const OrderSchema = require('../schema/order.schema')

const OrderModel = mongoose.model('Orders', OrderSchema)

module.exports = OrderModel