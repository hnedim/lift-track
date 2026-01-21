const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const users = require('./routes/users.js');
const exercises = require('./routes/exercises.js');
const workouts = require('./routes/workouts.js');
const workoutSessions = require('./routes/workout-sessions.js');
const rateLimit = require('express-rate-limit');
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

// General API rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later'
});

// Stricter limiter for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // only 5 requests per 15 minutes
  message: 'Too many login attempts, please try again later'
});

app.use(session(sessionConfig));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true  }));

// Apply to all routes
app.use('/', limiter);

// Apply stricter limits to specific routes
app.use('/login', authLimiter);
app.use('/register', authLimiter);

app.use('/', users);
app.use('/exercises', exercises);
app.use('/workouts', workouts);
app.use('/workoutSessions', workoutSessions)

app.use((err, req, res, next) => {
    const {statusCode = 500, message ="Something went wrong"} = err;
    res.status(statusCode).json({statusCode, message});
})

app.listen(3000,console.log('Server running'));