const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    exercises: [{type: mongoose.Schema.ObjectId, ref: 'Exercise'}],
    date: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Workout', WorkoutSchema);