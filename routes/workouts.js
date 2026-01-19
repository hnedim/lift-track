const express = require('express');
const router = express.Router();
const workouts = require('../controllers/workouts');
const {isLoggedIn} = require('../middleware/isLoggedIn');

router.post('/', isLoggedIn, workouts.createWorkout);
router.get('/', workouts.viewWorkouts);
router.get('/:id', workouts.showWorkout);

module.exports = router;