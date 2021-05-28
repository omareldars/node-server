const Order = require('../models/Order');
const Products = require('../models/Products');
const User = require('../models/User');

//add
const createOrder = (orders) => Order.create(orders);

//get all 
const getAll = (query) => Order.find(query);

//read one 
const readById = (id) => Order.findById(id).exec();

//edit your 
const editOrder = (id, body) => Order.findByIdAndUpdate(id, body, { new: true }).exec();

const deleteById = (id) => Order.findByIdAndDelete(id).exec();

const home = () => Order.find().sort([[' createdAt', -1]]).exec()

const searchcatTitle = async ({ ser }) => {
    const user = await User.find({ username: new RegExp(ser, 'i') }, { _id: 1 }).exec();
    console.log(user);
    return Products.find({ $or: [{ product: new RegExp(ser, 'i') }, { category: new RegExp(ser, 'i') }, { auther: { $in: user } }] }).exec();
}

//search by auther
const searchByUser = ({ user }) => Order.find({ user }).exec();

module.exports = {
    createOrder,
    getAll,
    readById,
    editOrder,
    deleteById,
    home,
    searchcatTitle,
    searchByUser
}
