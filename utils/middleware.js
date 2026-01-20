const {workoutSchema} = require('../schemas');
const {excerciseSchema} = require('../schemas');
const {workoutSessionSchema} = require('../schemas');
const {logExcerciseSchema} = require('../schemas');
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

module.exports.validateExcercise = (req,res,next) => {
    const {error} = excerciseSchema.validate(req.body);
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

module.exports.validateLogExcercise = (req,res,next) => {
    const {error} = logExcerciseSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}