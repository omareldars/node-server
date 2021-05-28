const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const orderSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
   orderItems:[{ 
       type:mongoose.Schema.Types.ObjectId,
       ref: 'Order'
   }],
    totalPrice:{
        type: Number,
        default: 0,
        required: true
    },

    status: {
        type: String,
        enum: ['pending','accepted','rejected'],
        default:'pending',
       
    },

    shippingAddress: {
        type: String,
    },

    city: {
        type: String,
    },

    country: {
        type: String,
        required: true
    },

    phone:{
        type: String,
        required: true
    },

},{
    timestamps: {createdAt: 'created_at', updatedAt: false}});
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;