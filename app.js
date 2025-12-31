const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('./models/user');
const users = require('./routes/users.js');
const excercises = require('./routes/excercises.js');
const Workout = require('./models/workout');
const workouts = require('./routes/workouts.js');
const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt');
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

app.use(express.urlencoded({extended: true  }));

app.use('/', users);
app.use('/excercises', excercises);
app.use('/workouts', workouts);

app.get('/', (req,res) => {
    res.send('Hello');
})

app.listen(3000,console.log('Server running'));