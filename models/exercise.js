const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    muscleGroup: {
        type: String,
        required: true,
        enum: ['biceps', 'triceps', 'back', 'chest', 'quads', 'glutes', 'shoulders']
    },
    user: {
        type: mongoose.Schema.ObjectId, ref: 'User', required: true
    }
})

module.exports = mongoose.model('Exercise', ExerciseSchema);