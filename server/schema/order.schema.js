const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema({
    orderedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    orderFirstName: String,
    orderLastName: String,
    orderAddress: String,
    orderApartments: String,
    orderCity: String,
    orderCountry: String,
    orderTotalPrice: Number,
    orderTotalAmount: Number,
    orderGmail: String,
    orderStatus: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending',
    },
    items: {
        type: [],
        default: [],
    }
}, { versionKey: false, timestamps: true })


module.exports = OrderSchema