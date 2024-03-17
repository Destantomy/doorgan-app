/* eslint-disable max-len */
const Product = require('../models/productModel');
const mongoose = require('mongoose');
const fs = require('fs');

const addProduct = async (req, res) => {
  try {
    const {productTitle, productPrice} = req.body;
    // data validation
    if (!productTitle || !productPrice) {
      return res.status(400).json({error: 'Please complete all the fields fill'});
    }
    // Check if req.files['productSnapshot'] exists and its not empty
    if (!req.files || !req.files['productSnapshot'] || req.files['productSnapshot'].length === 0) {
      return res.status(400).json({error: 'Please complete all the fields fill'});
    }
    // Check if req.files['productFile'] exists and its not empty
    if (!req.files || !req.files['productFile'] || req.files['productFile'].length === 0) {
      return res.status(400).json({error: 'Please complete all the fields fill'});
    }
    // validate title
    const titleIsExist = await Product.findOne({productTitle});
    if (titleIsExist) {
      return res.status(400).json({error: 'Title already exist'});
    }
    const productSnapshot = req.files['productSnapshot'][0].filename;
    const productFile = req.files['productFile'][0].filename;
    const product = await Product.create({productTitle, productPrice, productFile, productSnapshot});
    return res.status(201).json(product);
  } catch (error) {
    // Handle errors, including removing the uploaded file if necessary
    if (req.files && req.files['productSnapshot'] && req.files['productSnapshot'].length > 0) {
      const uploadedFilePath = req.files['productSnapshot'][0].path;
      // Remove the uploaded file to prevent orphaned files in case of an error
      fs.unlinkSync(uploadedFilePath);
    }
    // Handle errors, including removing the uploaded file if necessary
    if (req.files && req.files['productFile'] && req.files['productFile'].length > 0) {
      const uploadedFilePath = req.files['productFile'][0].path;
      // Remove the uploaded file to prevent orphaned files in case of an error
      fs.unlinkSync(uploadedFilePath);
    }
    return res.status(500).json({error: error.message});
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    // Map products to include imageUrl
    const productsWithImageUrls = products.map((product) => ({
      ...product._doc,
      imageUrl: ` http://localhost:4000/images/${product.productFile}`,
    }));
    return res.status(200).json(productsWithImageUrls);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

// Helper function to delete files from storage folder
const deleteFiles = (fileFields, product) => {
  const fs = require('fs');
  const path = require('path');
  // Assuming 'uploads' is your base directory
  const baseDirectory = 'sources/upload/';
  // Iterate through file fields and delete associated files
  fileFields.forEach((field) => {
    const filePath = path.join(baseDirectory, product[field]);
    // Check if the file exists before attempting to delete
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });
};

const deleteProduct = async (req, res) => {
  try {
    const {id} = req.params;
    // validate data if !valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'Product data not found'});
    }
    // the delete method
    const product = await Product.findOneAndDelete({_id: id});
    if (!product) {
      return res.status(404).json({error: 'Product data not found'});
    }
    // Delete the associated files from the storage folder
    deleteFiles(['productFile', 'productSnapshot'], product);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

module.exports = {addProduct, getProducts, deleteProduct};
