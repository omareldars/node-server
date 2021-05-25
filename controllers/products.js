const Products = require('../models/Products');

//add new product
const createProduct = (product) => Products.create(product);

module.exports = {
  createProduct,
};
