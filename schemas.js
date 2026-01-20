const Joi = require('joi');

const objectId = Joi.string().hex().length(24);

module.exports.workoutSchema = Joi.object({
    name: Joi.string().required(),
    user: objectId,
    excercises: Joi.array().items(objectId).required().min(1),
    date: Joi.date()
}).required();

module.exports.excerciseSchema = Joi.object({
    name: Joi.string().required(),
    muscleGroup: Joi.string().required(),
    user: objectId
}).required();

module.exports.workoutSessionSchema = Joi.object({
    user: objectId,
    workout: objectId.required(),
    excercises: Joi.array().items(Joi.object({
        excercise: objectId,
        sets: Joi.array().items(Joi.object({
            reps: Joi.number().required(),
            weight: Joi.number()
        })).required().min(1)
    }        
    )),
    date: Joi.date()
}).required()

module.exports.logExcerciseSchema = Joi.object({
    excercise: objectId.required(),
    sets: Joi.array().items(Joi.object({
        reps:Joi.number().required(),
        weight:Joi.number()
    })).required().min(1)
}).required()