const express = require('express');
const router = express.Router();
const workouts = require('../controllers/workouts');
const {isLoggedIn} = require('../middleware/isLoggedIn');
const catchAsync = require('../utils/catchAsync');
const {validateWorkout} = require('../utils/middleware');

router.route('/:id')
.get(isLoggedIn, catchAsync(workouts.showWorkout))
.put(isLoggedIn, validateWorkout, catchAsync(workouts.updateWorkout))
.delete(isLoggedIn, catchAsync(workouts.deleteWorkout));

router.route('/')
.post(isLoggedIn, validateWorkout, catchAsync(workouts.createWorkout))
.get(isLoggedIn, catchAsync(workouts.viewWorkouts));

module.exports = router;