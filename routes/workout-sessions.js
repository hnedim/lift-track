const express = require('express');
const router = express.Router();
const workoutSessions = require('../controllers/workout-sessions');
const {isLoggedIn} = require('../middleware/isLoggedIn');

router.post('/', isLoggedIn, workoutSessions.createWorkoutSession);
router.post('/:workoutSessionId', isLoggedIn, workoutSessions.logExcercise);
router.put('/:workoutSessionId/:loggedExcerciseId', isLoggedIn, workoutSessions.updateLoggedExcercise);
router.delete('/:workoutSessionId/:loggedExcerciseId', isLoggedIn, workoutSessions.deleteLoggedExcercise);
router.get('/:workoutSessionId', isLoggedIn, workoutSessions.viewWorkoutSession);
router.get('/', isLoggedIn, workoutSessions.allWorkoutSessions);
router.delete('/:workoutSessionId', isLoggedIn, workoutSessions.deleteWorkoutSession);

module.exports = router;