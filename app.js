const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const users = require('./routes/users.js');
const excercises = require('./routes/excercises.js');
const workouts = require('./routes/workouts.js');
const workoutSessions = require('./routes/workout-sessions.js')
const helmet = require('helmet');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/lift-track')
    .then(() => console.log('DB connected'))
    .catch(() => console.log('DB cant connect'));

const sessionConfig = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}

app.use(session(sessionConfig));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true  }));

app.use('/', users);
app.use('/excercises', excercises);
app.use('/workouts', workouts);
app.use('/workoutSessions', workoutSessions)

app.use((err, req, res, next) => {
    const {statusCode = 500, message ="Something went wrong"} = err;
    res.status(statusCode).json({statusCode, message});
})

app.listen(3000,console.log('Server running'));