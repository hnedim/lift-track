const express = require('express');
const router = express.Router();
const excercises = require('../controllers/excercises');
const catchAsync = require('../utils/catchAsync');
const {validateExcercise} = require('../utils/middleware');
const {isLoggedIn} = require('../middleware/isLoggedIn');

router.route('/')
.get(isLoggedIn, catchAsync(excercises.viewExcercises))
.post(isLoggedIn, validateExcercise, catchAsync(excercises.createExcercise));

router.route('/:id')
.get(isLoggedIn, catchAsync(excercises.showExcercise))
.put(isLoggedIn, validateExcercise, catchAsync(excercises.updateExcercise))
.delete(isLoggedIn, catchAsync(excercises.deleteExcercise));


module.exports = router;