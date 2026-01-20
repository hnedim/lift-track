const Workout = require('../models/workout');
const User = require('../models/user');

module.exports.viewWorkouts = async(req,res) => {
    const workouts = await Workout.find({user: req.user.usedId});
    res.json({workouts});
}

module.exports.createWorkout = async(req,res) => {
    const workout = new Workout(req.body);
    workout.user = req.user.userId;
    workout.date = new Date();
    await workout.save();
    res.json({workout});
}

module.exports.showWorkout = async(req,res) => {
    const {id} = req.params;
    const workout = await Workout.findById(id).populate('excercises');
    if(!workout) res.status(404).json({message: "That workout does not exist."});
    if(workout.user.equals(req.user.userId)){
        res.json({workout});
    } else {
        res.status(403).json({message:"Unauthorized"});
    }
}

module.exports.updateWorkout = async(req,res) => {
    const {id} = req.params;
    const workout = await Workout.findByIdAndUpdate(id, req.body,{new:true});
    if(!workout) res.status(404).json({message: "That workout does not exist."});
    if(workout.user.equals(req.user.userId)){
        res.json({workout});
    } else {
        res.status(403).json({message:"Unauthorized"});
    }
}

module.exports.deleteWorkout = async(req,res) => {
    const {id} = req.params;
    const workout = await Workout.findByIdAndDelete(id);
    if(!workout) res.status(404).json({message: "That workout does not exist."});
    if(workout.user.equals(req.user.userId)){
        res.json({workout});
    } else {
        res.status(403).json({message:"Unauthorized"});
    }
}

