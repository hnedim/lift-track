const express = require('express');
const router = express.Router();
const exercises = require('../controllers/exercises');
const catchAsync = require('../utils/catchAsync');
const {validateExercise} = require('../utils/middleware');
const {isLoggedIn} = require('../middleware/isLoggedIn');

router.route('/')
.get(isLoggedIn, catchAsync(exercises.viewExercises))
.post(isLoggedIn, validateExercise, catchAsync(exercises.createExercise));

router.route('/:id')
.get(isLoggedIn, catchAsync(exercises.showExercise))
.put(isLoggedIn, validateExercise, catchAsync(exercises.updateExercise))
.delete(isLoggedIn, catchAsync(exercises.deleteExercise));


module.exports = router;