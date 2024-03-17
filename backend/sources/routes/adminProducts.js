/* eslint-disable max-len */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {addProduct, getProducts, deleteProduct} = require('../controllers/adminProductsController');
const upload = require('../middleware/multer');

// require auth for using this routes
router.use(requireAuth);

// Middleware to check user role
const checkUserRole = (req, res, next) => {
  if (req.isAdmin.role === 'admin') {
    // User is an admin, allow the request
    next();
  } else {
    // User does not have the necessary role
    res.status(401).json({message: 'You had no permission to access these data'});
  }
};

// endpoint
// post product
router.post('/admin', checkUserRole, upload.fields([
  {name: 'productSnapshot', maxCount: 1},
  {name: 'productFile', maxCount: 1},
]), addProduct);
// get all product
router.get('/admin', checkUserRole, getProducts);
// delete a product
router.delete('/admin/:id', checkUserRole, deleteProduct);

module.exports = router;
