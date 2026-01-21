const {workoutSchema, exerciseSchema, workoutSessionSchema, 
    logExerciseSchema, registerSchema, loginSchema} = require('../schemas');
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

module.exports.validateRegistration = (req,res,next) => {
    const {error} = registerSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateLogin = (req,res,next) => {
    const {error} = loginSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}