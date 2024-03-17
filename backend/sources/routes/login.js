/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const {login, signup, verify} = require('../controllers/loginController');

// login
router.post('/login', login);
// signup
router.post('/signup', signup);
// email verification
router.get('/userVerify/:id/:token', verify);

module.exports = router;
