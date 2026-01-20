const WorkoutSession = require('../models/workout-session');
const User = require('../models/user');
const Workout = require('../models/workout');
const Exercise = require('../models/exercise')

module.exports.createWorkoutSession = async(req,res) => {
    const workoutSession = new WorkoutSession(req.body);
    workoutSession.user = req.user.userId;
    workoutSession.date = new Date();
    await workoutSession.save();
    res.json({workoutSession});
}

module.exports.deleteWorkoutSession = async(req,res) =>{
    const {workoutSessionId} = req.params;
    const workoutSession = await WorkoutSession.findByIdAndDelete(workoutSessionId);
    if(!workoutSession) res.status(404).json({message: "That workout does not exist"});

    if(workoutSession.user.equals(req.user.userId)){
        res.json({message: "DELETED", workoutSession: workoutSession});
    } else {
        res.status(403).json({message: "Unauthorized."})
    }
}

module.exports.viewWorkoutSession = async(req,res) => {
    const {workoutSessionId} = req.params;
    const workoutSession = await WorkoutSession.findById(workoutSessionId);
    if(!workoutSession) res.status(404).json({message: "That workout does not exist"});

    if(workoutSession.user.equals(req.user.userId)){
        res.json({message: "DELETED", workoutSession: workoutSession});
    } else {
        res.status(403).json({message: "Unauthorized."})
    }
    res.json({workoutSession});
}

module.exports.allWorkoutSessions = async(req,res) => {
    const workoutSessions = await WorkoutSession.find({user: req.user.usedId});
    res.json({workoutSessions});
}

module.exports.logExercise = async(req,res) => {
    const {workoutSessionId} = req.params;
    const workoutSession = await WorkoutSession.findById(workoutSessionId);
    if(!workoutSession) res.status(404).json({message: "That workout does not exist"});

    if(workoutSession.user.equals(req.user.userId)){
        res.json({message: "DELETED", workoutSession: workoutSession});
    } else {
        res.status(403).json({message: "Unauthorized."})
    }

    workoutSession.exercises.push(req.body);
    await workoutSession.save();
    res.json({workoutSession});
}

module.exports.updateLoggedExercise = async(req,res) => {
    const {workoutSessionId, loggedExerciseId} = req.params;
    const workoutSession = await WorkoutSession.findById(workoutSessionId);
    if(!workoutSession) res.status(404).json({message: "That workout does not exist"});

    if(workoutSession.user.equals(req.user.userId)){
        res.json({message: "DELETED", workoutSession: workoutSession});
    } else {
        res.status(403).json({message: "Unauthorized."})
    }

    let exerciseLog = workoutSession.exercises.id(loggedExerciseId);
    exerciseLog.exercise = req.body.exercise || exerciseLog.exercise;
    exerciseLog.sets = req.body.sets || exerciseLog.sets;
    await workoutSession.save();
    res.json({workoutSession});
}

module.exports.deleteLoggedExercise = async(req,res) => {
    const {workoutSessionId, loggedExerciseId} = req.params;
    const workoutSession = await WorkoutSession.findByIdAndUpdate(workoutSessionId,
        {$pull: {exercises: {_id: loggedExerciseId}}},
        {new: true}
    );

    if(!workoutSession) res.status(404).json({message: "That workout does not exist"});

    if(workoutSession.user.equals(req.user.userId)){
        res.json({message: "DELETED", workoutSession: workoutSession});
    } else {
        res.status(403).json({message: "Unauthorized."})
    }

    res.json({workoutSession});
}
// {
//     exercise: '2141251',
//     sets: [
//         {reps: 12, weight: 75},
//         {reps: 10, weight: 75},
//         {reps: 10, weight: 75}
//     ]
// }



