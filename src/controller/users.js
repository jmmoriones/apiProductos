const User = require('../model/user'),
  Product = require('../model/product'),
  multer = require('multer'),
  fs = require('fs'),
  path = require('path')

module.exports = {
  index: async (req, res, next) => {
    let url = path.join(__dirname, '../../')
    const users =  await User.find().sort({_id: -1})
    console.log(url)
    res.status(200).json(users)
  },
  getUser: async (req, res, next) => {
    const { userId } = req.params
    const user = await User.findById(userId)
    res.status(200).json(user)
  },
  newUser: async (req, res, next) => {
    const newUser = new User(req.body)
    const user = await newUser.save()
    res.status(201).json(user)
  },
  replaceUser: async (req, res, next) => {
    const { userId } = req.params,
      datauser = req.body
    const userUpdate = await User.findByIdAndUpdate(userId, datauser)
    res.status(200).json({success: true})
  },
  updateUser: async (req, res, next) => {
    const { userId } = req.params,
      datauser = req.body
    const userUpdate = await User.findByIdAndUpdate(userId, datauser)
    res.status(200).json({success: true})
  },
  deleteUser: async (req, res, next) => {
    const {userId} = req.params
    const removeUser = await User.findByIdAndRemove(userId)
    res.status(200).json({success: true})
  },
  getUserProducts: async (req, res, next) => {
    const {userId} = req.params
    const user = await User.findById(userId).populate({path: 'products', options: { sort: { '_id': -1 } } })
    res.status(200).json(user)
  },
  newUserProducts: async (req, res, next) => {
    const {userId} = req.params
    const product = new Product(req.body)
    const user = await User.findById(userId)
    product.buyer = user
    await product.save()
    user.products.push(product)
    await user.save()
    res.status(200).json(product)
  },
  updateUserProduct: async (req, res, next) => {
    const {productId} = req.params,
      productdata = req.body
    const productupdate = await Product.findByIdAndUpdate(productId, productdata)
    res.status(200).json({success: true})
  },
  deleteUserProduct: async (req, res, next) => {
    const {productId, namePhoto} = req.params
    const deletProduct = await Product.findByIdAndRemove(productId)
    fs.unlink(`${path.join(__dirname, '../../public/products/', namePhoto)}`, (err) => {
      if (err) {
        console.log("failed to delete local image:"+err);
      } else {
        console.log('successfully deleted local image');      
      }
    })
    res.status(200).json({success: true})
  },
  photo: (req, res, next) => {
    res.status(200).json({success:true})
    console.log(req.file)
  },
  deleteIdProductFn: async (req, res, next) =>{
    const {productId} = req.params,
      userId = req.body._id
    const deleteIdProduct = await User.update({_id: userId}, { $pull: {"products": productId} })
    res.status(200).json(deleteIdProduct)
  }
}
