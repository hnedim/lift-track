const express = require('express');
const router = express.Router();
const workouts = require('../controllers/workouts');
const {isLoggedIn} = require('../middleware/isLoggedIn');
const catchAsync = require('../utils/catchAsync');

router.get('/:id', catchAsync(workouts.showWorkout));

router.route('/')
.post(isLoggedIn, catchAsync(workouts.createWorkout))
.get(catchAsync(workouts.viewWorkouts));

module.exports = router;