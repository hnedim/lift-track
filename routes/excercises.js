const express = require('express');
const router = express.Router();
const excercises = require('../controllers/excercises');
const catchAsync = require('../utils/catchAsync');
const {validateExcercise} = require('../utils/middleware');

router.route('/')
.get(catchAsync(excercises.viewExcercises))
.post(validateExcercise, catchAsync(excercises.createExcercise));

router.route('/:id')
.get(catchAsync(excercises.showExcercise))
.put(validateExcercise, catchAsync(excercises.updateExcercise))
.delete(catchAsync(excercises.deleteExcercise));


module.exports = router;