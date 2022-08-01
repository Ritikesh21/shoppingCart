const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const cartSchema = new mongoose.Schema({
    userId: objectId,
    items: [{
      productId: objectId,
      quantity: Number
    }],
    totalPrice: Number,
    totalItems: Number,
},
{timestamps : true}
)

module.exports = mongoose.model('cartModel', cartSchema)