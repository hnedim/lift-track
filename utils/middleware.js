const {workoutSchema} = require('../schemas');
const {exerciseSchema} = require('../schemas');
const {workoutSessionSchema} = require('../schemas');
const {logExerciseSchema} = require('../schemas');
const ExpressError = require('../utils/ExpressError')

module.exports.validateWorkout = (req,res,next) => {
    const {error} = workoutSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateExercise = (req,res,next) => {
    const {error} = exerciseSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateWorkoutSession = (req,res,next) => {
    const {error} = workoutSessionSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateLogExercise = (req,res,next) => {
    const {error} = logExerciseSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}