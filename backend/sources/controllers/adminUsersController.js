/* eslint-disable max-len */
const User = require('../models/loginModel');
const mongoose = require('mongoose');

const getUsers = async (req, res) => {
  try {
    if (req.isAdmin.role !== 'admin') {
      return res.status(401).json({message: 'You had no permisson to access these data'});
    } else {
      const users = await User.find({}).sort({created: -1});
      return res.status(200).json(users);
    }
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.isAdmin.role !== 'admin') {
      return res.status(401).json({message: 'You had no permisson to access these data'});
    } else {
      const {id} = req.params;
      // if data doesnt valid
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: 'No such user data'});
      }
      // else --> delete method
      const user = await User.findOneAndDelete({_id: id});
      // validate if data not found
      if (!user) {
        return res.status(404).json({message: 'No such user data'});
      }
      // else
      return res.status(202).json(user);
    }
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

module.exports = {getUsers, deleteUser};
