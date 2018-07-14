const router = require('express-promise-router')(),
  multer = require('multer'),
  path = require('path')
const {
  index,
  getUser,
  newUser,
  replaceUser,
  updateUser,
  deleteUser,
  getUserProducts,
  newUserProducts,
  updateUserProduct,
  deleteUserProduct,
  photo,
  deleteIdProductFn
} = require('../controller/users');

var storage = multer.diskStorage({
  // destination
  destination: function (req, file, cb) {
    cb(null, './public/products')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    //cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

let upload = multer({ storage: storage });

router.get('/', index)
router.get('/:userId', getUser)
router.post('/', newUser)
router.put('/:userId', replaceUser)
router.delete('/:userId', deleteUser)
router.get('/:userId/products', getUserProducts)
router.post('/:userId/product', newUserProducts)
router.put('/:productId/product', updateUserProduct)
router.delete('/:productId/:namePhoto/product', deleteUserProduct)
router.put('/:productId/productDelete', deleteIdProductFn)

router.post('/foto', upload.single('photo'), photo)

module.exports = router
