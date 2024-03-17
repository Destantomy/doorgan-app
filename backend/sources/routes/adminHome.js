/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth.js');
const getCount = require('../controllers/adminHomeController.js');

// require auth for using this routes
router.use(requireAuth);
// endpoint
// get users
router.get('/admin', getCount);

module.exports = router;
