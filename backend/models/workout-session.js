const mongoose = require('mongoose');

const WorkoutSessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    },
    workout: {
        type: mongoose.Schema.ObjectId, ref: 'Workout'
    },
    exercises: [{
        exercise: {type: mongoose.Schema.ObjectId, ref: 'Exercise', required: true},
        sets: [
            {
                _id: false,
                reps: {
                    type: Number,
                    required:true
                },
                weight: {
                    type:Number
                }
            }
        ]
    }],
    date: {type: Date, required: true}
})


module.exports = mongoose.model('WorkoutSession', WorkoutSessionSchema);