/* eslint-disable max-len */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productTitle: {
    type: String,
    required: true,
    unique: true,
  },
  productSnapshot: {
    type: String,
    required: true,
  },
  productFile: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
}, {timestamps: true});

module.exports = mongoose.model('product_data', productSchema);
