const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    excercises: [{type: mongoose.Schema.ObjectId, ref: 'Excercise'}],
    date: {
        type: Date,
        required: true
    }
})