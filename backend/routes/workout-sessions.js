const express = require('express');
const router = express.Router();
const workoutSessions = require('../controllers/workout-sessions');
const {isLoggedIn} = require('../middleware/isLoggedIn');
const catchAsync = require('../utils/catchAsync');
const {validateWorkoutSession, validateLogExercise} = require('../utils/middleware');

router.route('/')
.post(isLoggedIn, validateWorkoutSession, catchAsync(workoutSessions.createWorkoutSession))
.get(isLoggedIn, catchAsync(workoutSessions.allWorkoutSessions));

router.route('/:workoutSessionId')
.post(isLoggedIn, validateLogExercise, catchAsync(workoutSessions.logExercise))
.get(isLoggedIn, catchAsync(workoutSessions.viewWorkoutSession))
.delete(isLoggedIn, catchAsync(workoutSessions.deleteWorkoutSession));

router.route('/:workoutSessionId/:loggedExerciseId')
.put(isLoggedIn, validateLogExercise, catchAsync(workoutSessions.updateLoggedExercise))
.delete(isLoggedIn, catchAsync(workoutSessions.deleteLoggedExercise));


module.exports = router;