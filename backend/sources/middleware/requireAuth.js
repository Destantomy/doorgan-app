const jwt = require('jsonwebtoken');
const Login = require('../models/loginModel');

const requireAuth = async (req, res, next) => {
  // verify auth
  const {authorization} = await req.headers;

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required !'});
  }

  // split jwt tokenize
  const token = await authorization.split(' ')[1];
  try {
    const {_id} = await jwt.verify(token, process.env.TOKEN);
    req.isAdmin = await Login.findOne({_id});
    req.user = await Login.findOne({_id}).select('_id');
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({error: 'Request is not authorized'});
  }
};

module.exports = requireAuth;
