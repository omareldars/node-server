const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const orderSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
        required:true
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
},{
    timestamps: {createdAt: 'created_at', updatedAt: false}});
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;