const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const productsData = new Schema({
  price: Number,
  name: String,
  description: String,
  photo: String,
  buyer: [{
    type: Schema.Types.ObjectId,
    ref: 'userData'
  }]
})

module.exports = mongoose.model('productData', productsData)
