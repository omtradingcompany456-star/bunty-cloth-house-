const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    wholesalePrice: Number,
    stock: Number,
    description: String,
    images: [String],
    videos: [String]
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);