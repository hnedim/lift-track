const WorkoutSession = require('../models/workout-session');
const User = require('../models/user');
const Workout = require('../models/workout');
const Excercise = require('../models/excercise')

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

module.exports.logExcercise = async(req,res) => {
    const {workoutSessionId} = req.params;
    const workoutSession = await WorkoutSession.findById(workoutSessionId);
    if(!workoutSession) res.status(404).json({message: "That workout does not exist"});

    if(workoutSession.user.equals(req.user.userId)){
        res.json({message: "DELETED", workoutSession: workoutSession});
    } else {
        res.status(403).json({message: "Unauthorized."})
    }

    workoutSession.excercises.push(req.body);
    await workoutSession.save();
    res.json({workoutSession});
}

module.exports.updateLoggedExcercise = async(req,res) => {
    const {workoutSessionId, loggedExcerciseId} = req.params;
    const workoutSession = await WorkoutSession.findById(workoutSessionId);
    if(!workoutSession) res.status(404).json({message: "That workout does not exist"});

    if(workoutSession.user.equals(req.user.userId)){
        res.json({message: "DELETED", workoutSession: workoutSession});
    } else {
        res.status(403).json({message: "Unauthorized."})
    }

    let excerciseLog = workoutSession.excercises.id(loggedExcerciseId);
    excerciseLog.excercise = req.body.excercise || excerciseLog.excercise;
    excerciseLog.sets = req.body.sets || excerciseLog.sets;
    await workoutSession.save();
    res.json({workoutSession});
}

module.exports.deleteLoggedExcercise = async(req,res) => {
    const {workoutSessionId, loggedExcerciseId} = req.params;
    const workoutSession = await WorkoutSession.findByIdAndUpdate(workoutSessionId,
        {$pull: {excercises: {_id: loggedExcerciseId}}},
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
//     excercise: '2141251',
//     sets: [
//         {reps: 12, weight: 75},
//         {reps: 10, weight: 75},
//         {reps: 10, weight: 75}
//     ]
// }



