const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Workout = require('../models/workout');
const User = require('../models/user');

module.exports.viewWorkouts = async(req,res) => {
    const workouts = await Workout.find();
    res.json({workouts});
}

module.exports.createWorkout = async(req,res) => {
    console.log(req.user);
    const workout = new Workout(req.body);
    workout.user = await User.findById(req.user.userId);
    workout.date = new Date();
    await workout.save();
    res.json({workout});
}