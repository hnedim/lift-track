const Joi = require('joi');
const {muscleGroups} = require('./models/exercise');

const objectId = Joi.string().hex().length(24);


module.exports.workoutSchema = Joi.object({
    name: Joi.string().required().min(3).max(25),
    user: objectId,
    exercises: Joi.array().items(objectId).required().min(1).max(50),
    date: Joi.date()
}).required();

module.exports.exerciseSchema = Joi.object({
    name: Joi.string().required().min(3).max(25),
    muscleGroup: Joi.string().required().min(3).max(20).valid(...muscleGroups),
    user: objectId
}).required();

module.exports.workoutSessionSchema = Joi.object({
    user: objectId,
    workout: objectId.required(),
    exercises: Joi.array().items(Joi.object({
        exercise: objectId,
        sets: Joi.array().items(Joi.object({
            reps: Joi.number().required(),
            weight: Joi.number()
        })).required().min(1)
    }        
    )),
    date: Joi.date()
}).required()

module.exports.logExerciseSchema = Joi.object({
    exercise: objectId.required(),
    sets: Joi.array().items(Joi.object({
        reps:Joi.number().required(),
        weight:Joi.number()
    })).required().min(1)
}).required()