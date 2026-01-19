const Workout = require('../models/workout');
const User = require('../models/user');

module.exports.viewWorkouts = async(req,res) => {
    const workouts = await Workout.find();
    res.json({workouts});
}

module.exports.createWorkout = async(req,res) => {
    const workout = new Workout(req.body);
    workout.user = await User.findById(req.user.userId);
    workout.date = new Date();
    await workout.save();
    res.json({workout});
}

module.exports.showWorkout = async(req,res) => {
    const {id} = req.params;
    const workout = await Workout.findById(id).populate('excercises');
    res.json({workout});
}

module.exports.updateWorkout = async(req,res) => {
    const {id} = req.params;
    const workout = await Workout.findById(id);
    workout.name = req.body.name;
    await workout.save();
    res.json({workout});
}

module.exports.newWorkout = async(req,res) => {
    const {id} = req.params
}

module.exports.addWorkout = async(req,res) => {
    const {id} = req.params;
    const workout = await Workout.findById(id);
}

