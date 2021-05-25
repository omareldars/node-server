const express = require('express');
const { createProduct } = require('../controllers/products');
const path = require('path');
const Product = require('../models/Products');
const router = express.Router();
const multer = require('multer');
const adminAuth = require('../middlewares/admin');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'image/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});
const auth = require('../middlewares/auth');

//@routes Get /api/products
//@desc Get all products
//@access public

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/home', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.json({ message: err });
  }
});

// @routes Post /api/products
// @desc add product
// @access private

router.post('/', [auth, adminAuth], (req, res) => {
  const upload = multer({ storage: storage }).single('photo');

  upload(req, res, function (err) {
    const { body } = req;
    if (req.file != undefined) body.photo = req.file.path;
    createProduct({ ...body })
      .then((product) => res.json(product))
      .catch((e) => {
        console.log(e);
        next(e);
      });
  });
});

//@routes Get /api/products/:productId
//@desc Get  product by its id
//@access public

router.get('/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.json(product);
  } catch (err) {
    res.json({ message: err });
  }
});

//@routes delete /api/products/:productId
//@desc delete  specific product
//@access private

router.delete('/:productId', [auth, adminAuth], async (req, res) => {
  try {
    const removedProduct = await Product.deleteOne({
      _id: req.params.productId,
    });
    res.json(removedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

//@routes Put /api/products/:productId
//@desc update specific product
//@access private

router.put('/:productId', [auth, adminAuth], async (req, res) => {
  try {
    const productfind = await Product.findById(req.params.productId);
    if (!productfind) {
      return res.status(400).json({ msg: 'product not found' });
    }
    const productUpdate = await Product.findByIdAndUpdate(
      req.params.productId,

      req.body,
      { new: true }
    );
    const productSaved = await productUpdate.save();
    res.json(productSaved);
  } catch (error) {
    console.error(error.msg);
    res.status(500).send('server errors');
  }
});

// search product by titile
router.get('/title/:product', auth, async (req, res, next) => {
  const {
    params: { product },
  } = req;
  try {
    const products = await Product.find({ product }).exec();
    res.json(products);
  } catch (e) {
    next(e);
  }
});

module.exports = router;

// route.post('/add', auth, async (req, res, next) => {
//     console.log(req.user);
//     const upload = multer({ storage: storage }).single("photo");

//     upload(req, res, function (err) {
//       console.log(req.user);
//       const { body, user: { id } } = req;
//       if (req.file != undefined)
//         body.photo = req.file.path;
//       createblog({ ...body, auther: id }).then(blog => res.json(blog)).catch(e => {
//         console.log(e);
//         next(e)
//       });
//     });
//   });
