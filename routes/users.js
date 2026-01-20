const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn} = require('../middleware/isLoggedIn')

router.post('/register', catchAsync(users.register));
router.get('/user', isLoggedIn, catchAsync(users.viewUser));
router.post('/login', catchAsync(users.login));

module.exports = router;