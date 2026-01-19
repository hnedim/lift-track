const express = require('express');
const router = express.Router();
const excercises = require('../controllers/excercises');
const catchAsync = require('../utils/catchAsync');

router.route('/')
.get(catchAsync(excercises.viewExcercises))
.post(catchAsync(excercises.createExcercise));

router.route('/:id')
.get(catchAsync(excercises.showExcercise))
.put(catchAsync(excercises.updateExcercise))
.delete(catchAsync(excercises.deleteExcercise));


module.exports = router;