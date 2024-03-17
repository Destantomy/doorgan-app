const Product = require('../models/productModel');
const mongoose = require('mongoose');
const fs = require('fs');
const uuid = require('uuid');
const Midtrans = require('midtrans-client');

const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.SECRET,
  clientKey: process.env.PUBLIC_CLIENT,
});

// get all product
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    // Map products to include imageUrl
    const productsWithImageUrls = products.map((product) => ({
      ...product._doc,
      imageUrl: `http://localhost:4000/images/${product.productSnapshot}`,
    }));
    return res.status(200).json(productsWithImageUrls);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

// get product by :id
const getProductById = async (req, res) => {
  try {
    const {id} = req.params;
    //  if data doesnt valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No data product was found'});
    }
    // else
    const product = await Product.findById(id);
    // if product dosent exist
    if (!product) {
      return res.status(404).json({error: 'No data product was found'});
    }
    res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

// download file by :id
const downloadFile = async (req, res) => {
  try {
    const {id} = req.params;
    //  if data doesnt valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No data product was found'});
    }
    // else
    const product = await Product.findById(id);
    // if product dosent exist
    if (!product) {
      return res.status(404).json({error: 'No data product was found'});
    }
    // Construct the path to the file
    const filePath = `sources/upload/${product.productFile}`;
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({error: 'File not found'});
    }
    // Send the file as a response
    res.download(filePath, product.productFile, (err) => {
      if (err) {
        console.error('Error during download:', err);
        res.status(500).json({error: 'Internal Server Error'});
      }
    });
    // return res.status(200).json({message: 'download successfuly'});
    // console.log(filePath);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

// tokenizer midtrans
const tokenizer = async (req, res) => {
  try {
    const {id} = req.params;
    //  if data doesnt valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No data product was found'});
    }
    // else
    const product = await Product.findById(id);
    // if product dosent exist
    if (!product) {
      return res.status(404).json({error: 'No data product was found'});
    }
    const parameter = {
      item_details: {
        name: product.productTitle,
        price: product.productPrice,
        quantity: 1,
      },
      transaction_details: {
        order_id: uuid.v4(),
        gross_amount: product.productPrice * 1,
      },
    };
    const token = await snap.createTransactionToken(parameter);
    return res.status(201).json({token});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

module.exports = {getProducts, getProductById, downloadFile, tokenizer};
