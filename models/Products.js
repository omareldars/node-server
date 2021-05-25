const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  photo: { type: String, required: true },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updateAt: Date,
  price: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
