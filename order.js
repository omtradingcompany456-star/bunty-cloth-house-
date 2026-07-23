const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerName: String,
    phone: String,
    products: Array,
    advancePayment: Number,
    status: {
        type: String,
        default: "Pending"
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);