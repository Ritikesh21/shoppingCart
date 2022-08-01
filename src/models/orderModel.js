const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({
    userId: objectId,
    items: [{
      productId: objectId,
      quantity: Number
    }],
    totalPrice: Number,
    totalItems: Number,
    totalQuantity: Number,
    cancellable: Boolean,
    status: String, 
    isDeleted: Boolean
},
{timestamps : true})

module.exports = mongoose.model('orderModel', orderSchema)