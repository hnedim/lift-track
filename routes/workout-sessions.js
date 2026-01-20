const express = require('express');
const router = express.Router();
const workoutSessions = require('../controllers/workout-sessions');
const {isLoggedIn} = require('../middleware/isLoggedIn');
const catchAsync = require('../utils/catchAsync');
const {validateWorkoutSession} = require('../utils/middleware');
const {validateLogExcercise} = require('../utils/middleware');

router.route('/')
.post(validateWorkoutSession, isLoggedIn, catchAsync(workoutSessions.createWorkoutSession))
.get(isLoggedIn, catchAsync(workoutSessions.allWorkoutSessions));

router.route('/:workoutSessionId')
.post(validateLogExcercise, isLoggedIn, catchAsync(workoutSessions.logExcercise))
.get(isLoggedIn, catchAsync(workoutSessions.viewWorkoutSession))
.delete(isLoggedIn, catchAsync(workoutSessions.deleteWorkoutSession));

router.route('/:workoutSessionId/:loggedExcerciseId')
.put(validateLogExcercise, isLoggedIn, catchAsync(workoutSessions.updateLoggedExcercise))
.delete(isLoggedIn, catchAsync(workoutSessions.deleteLoggedExcercise));


module.exports = router;