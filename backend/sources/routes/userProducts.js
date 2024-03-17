/* eslint-disable new-cap */
/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {getProducts, getProductById, downloadFile, tokenizer} = require('../controllers/userProductController');

// require auth for using this routes
router.use(requireAuth);
// endpoints
// get all products
router.get('/products', getProducts);
// get product by id
router.get('/products/:id', getProductById);
// payment gateway
router.post('/products/payment/:id', tokenizer);
// download a file
router.get('/products/download/:id', downloadFile);

module.exports = router;
