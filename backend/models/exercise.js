const mongoose = require('mongoose');

const muscleGroups = ['biceps', 'triceps', 'back', 'chest', 'quads', 'glutes', 'shoulders'];

const ExerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    muscleGroup: {
        type: String,
        required: true,
        enum: [...muscleGroups]
    },
    user: {
        type: mongoose.Schema.ObjectId, ref: 'User', required: true
    }
})

const Exercise = mongoose.model('Exercise', ExerciseSchema);
module.exports = Exercise;
module.exports.muscleGroups = muscleGroups;
