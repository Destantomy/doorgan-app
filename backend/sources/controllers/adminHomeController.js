/* eslint-disable max-len */
const User = require('../models/loginModel');
const Product = require('../models/productModel');

const getCount = async (req, res) => {
  try {
    if (req.isAdmin.role !== 'admin') {
      return res.status(401).json({message: 'You had no permisson to access these data'});
    } else {
      const productsCount = await Product.countDocuments();
      const usersCount = await User.countDocuments();
      return res.status(200).json({productsCount, usersCount});
    }
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

module.exports = getCount;
