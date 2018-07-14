const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const userData = new Schema({
  firstName: String,
  lastName: String,
  birthDate: String,
  email: String,
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'productData'
  }]
})

module.exports = mongoose.model('userData', userData)
