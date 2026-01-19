const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');

router.post('/register', catchAsync(users.register));

router.post('/login', catchAsync(users.login));

module.exports = router;