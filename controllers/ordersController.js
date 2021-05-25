// const Order = require('../models/Order')

// const getAll = async(req,res)=>{
//     const orders = await Order.find().populate('user').populate('products').sort("createdAt");
//     res.send(orders);
// }

// const createOrder = async(req,res)=>{
//     const {body} = req;
//     try{
//         const newOrder = await Order.create(body);
//         if(newOrder){
//             return res.status(200).send(newOrder);
//         }
//     }catch(err){
//         return res.status(500).send({message : " Can't create order "});
//     }
// }

// const getById = async(req,res) =>{
//     try{
//         const order = await Order.findOne({_id: req.params.id});
//         if(order){
//             res.send(order)
//         } 
//     }catch(err){
//         return res.status(400).send({ message : "Order Not Found" });
//     }
// }


// const getByIdAndUpdate = async(req,res)=>{
//     try {
//     const order =await Order.findOneAndUpdate(
//         req.params.id,
//         {
//             status:req.body.status
//         }
//     );
//     if (order) {
//         res.send(order);
//     } 
// }catch(err){
//     return res.status(400).send({"message":"order not found"});
//  }   
// }
// const deleteorder = (id) => Order.findByIdAndRemove(id).exec();
// module.exports ={
//     getAll,
//     createOrder,
//     getById,
//     getByIdAndUpdate,
//     deleteorder
// }

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
