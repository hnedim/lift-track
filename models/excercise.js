const mongoose = require('mongoose');

const ExcerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    muscleGroup: {
        type: String,
        required: true,
        enum: ['biceps', 'triceps', 'back', 'chest', 'quads', 'glutes', 'shoulders']
    }
})

module.exports = mongoose.model('Excercise', ExcerciseSchema);