/* eslint-disable max-len */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const {getUsers, deleteUser}= require('../controllers/adminUsersController.js');
const requireAuth = require('../middleware/requireAuth.js');

// require auth for using this routes
router.use(requireAuth);
// endpoint
// get users
router.get('/admin', getUsers);
// delete user
router.delete('/admin/:id', deleteUser);

module.exports = router;
