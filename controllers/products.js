const Products = require('../models/Products');
const User = require('../models/User');
// //search by title
// const searchByTitle = ({ product}) => Products.find({ product}).exec();

//add new product
const createProduct = (product) => Products.create(product);

const searchcatTitle = async ({ ser }) => {
  const user = await User.find({ username: new RegExp(ser, 'i') }, { _id: 1 }).exec();
  console.log(user);
  return Products.find({ $or: [{ title: new RegExp(ser, 'i') }, { category: new RegExp(ser, 'i') }, { auther: { $in: user } }] }).exec();


}

module.exports = {
  createProduct,
  searchcatTitle  
};
