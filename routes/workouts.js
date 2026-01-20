const express = require('express');
const router = express.Router();
const workouts = require('../controllers/workouts');
const {isLoggedIn} = require('../middleware/isLoggedIn');
const catchAsync = require('../utils/catchAsync');
const {validateWorkout} = require('../utils/middleware');

router.route('/:id')
.get(catchAsync(workouts.showWorkout))
.put(validateWorkout, catchAsync(workouts.updateWorkout))

router.route('/')
.post(validateWorkout, isLoggedIn, catchAsync(workouts.createWorkout))
.get(catchAsync(workouts.viewWorkouts));

module.exports = router;