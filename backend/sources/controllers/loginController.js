/* eslint-disable max-len */
const jwt = require('jsonwebtoken');
const User = require('../models/loginModel');
const Token = require('../models/tokenModel');
const validator = require('validator');
const bcrypt = require('bcrypt');
const {nanoid} = require('nanoid');
const sendEmail = require('../utility/mailer');
const multer = require('multer');
const formHandling = multer();

// setting jwt token expires in 30mns
const expiredTime = 1800;
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.TOKEN, {expiresIn: expiredTime});
};

// login
const login = async (req, res) => {
  try {
    // for handling form-data
    formHandling.none()(req, res, async function(err) {
      if (err) {
        return res.status(400).json({error: 'Error while handling form-data'});
      }
      // req.body
      const {email, password} = req.body;
      // data validation
      if (!email || !password) {
        return res.status(400).json({error: 'Please complete all the fields fill'});
      }
      const user = await User.findOne({email});
      if (!user) {
        return res.status(400).json({error: 'Incorrect email inserted'});
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({error: 'Incorrect password inserted'});
      }
      if (!user.verified) {
        return res.status(400).json({error: 'Please verifiy your account from sent email'});
      }
      // if data valid then create token and collect from db
      const token = createToken(user._id);
      if (user.role === 'user') {
        return res.status(202).json({username: user.username, email, token, role: user.role, message: 'login succesfuly'});
      }
      if (user.role === 'admin') {
        return res.status(202).json({username: user.username, email, token, role: user.role, message: 'login as admin'});
      }
    });
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

// signup
const signup = async (req, res) => {
  try {
    // for handling form-data
    formHandling.none()(req, res, async function(err) {
      if (err) {
        return res.status(400).json({error: 'Error while handling form-data'});
      }
      // req.body
      const {username, email, password} = req.body;
      // data validation
      if (!username || !email|| !password) {
        return res.status(400).json({error: 'Please complete all the fields fill'});
      }
      if (!validator.isEmail(email)) {
        return res.status(400).json({error: 'Email did not valid'});
      }
      if (!validator.isStrongPassword(password)) {
        return res.status(400).json({error: 'Password did not strong enough'});
      }
      const usernameExist = await User.findOne({username});
      const emailExist = await User.findOne({email});
      if (usernameExist) {
        return res.status(400).json({error: 'Username already taken'});
      }
      if (emailExist) {
        return res.status(400).json({error: 'Email already taken'});
      }
      // if data valid post to db then create token
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const user = await User.create({username, email, password: hash});
      const tokenize = await createToken(user._id);
      // send verification token
      const verifyToken = await new Token({
        userId: user._id,
        token: `verify-${nanoid(20)}`,
      }).save();
      const url = `https://doorganapparel.vercel.app/userVerify/${verifyToken.userId}/${verifyToken.token}`;
      await sendEmail(user.email, 'Email verification', url);
      return res.status(201).json({
        email,
        tokenize,
        message: 'Registration successfuly, please verify your account via email',
      });
    });
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

// verifying token
const verify = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.params.id});
    if (!user) {
      return res.status(400).json({message: 'Invalid link'});
    }
    const tokenize = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!tokenize) {
      return res.status(400).json({message: 'Invalid link'});
    }
    await User.updateOne({_id: user._id}, {verified: true});
    await tokenize.deleteOne();
    return res.status(202).json({message: 'Email verification successfuly'});
  } catch (error) {
    return res.status(500).json({message: error});
  }
};

module.exports = {login, signup, verify};
