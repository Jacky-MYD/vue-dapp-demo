const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
    id: Number,
    productName: String,
    picture: String,
    price: Number,
    amount: Number
})

module.exports = mongoose.model('store', storeSchema)
