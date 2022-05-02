const mongoose = require("mongoose");

const Order = mongoose.model(
    "Order",
    new mongoose.Schema({
        products: {
            type: Object,
            required: true
        },
        uid: {
            type: String,
            required: true
        },
        total: Number,
        price: Number,
        status: {
            type: String,
            default: 'In Queue'
        }
    })
);

module.exports = Order;