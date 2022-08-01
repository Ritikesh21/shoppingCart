const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({ 
    title: String,
    description: String,
    price: Number,
    currencyId: String,
    currencyFormat: String,
    isFreeShipping: Boolean,
    productImage: String,
    style: String,
    availableSizes: String,
    installments: Number,
    deletedAt: Date, 
    isDeleted: Boolean
  },
  {timestamps : true}
  )

  module.exports = mongoose.model('productModel', productSchema)