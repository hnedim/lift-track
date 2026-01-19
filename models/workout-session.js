const mongoose = require('mongoose');

const WorkoutSessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    },
    workout: {
        type: mongoose.Schema.ObjectId, ref: 'Workout'
    },
    excercises: [{
        excercise: {type: mongoose.Schema.ObjectId, ref: 'Excercise', required: true},
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
    date: String
})


module.exports = mongoose.model('WorkoutSession', WorkoutSessionSchema);