const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('./models/user');
const users = require('./routes/users.js');
const Excercise = require('./models/excercise');
const Workout = require('./models/workout');
const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt');
const app = express();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

mongoose.connect('mongodb://127.0.0.1:27017/lift-track')
    .then(() => console.log('DB connected'))
    .catch(() => console.log('DB cant connect'));

const sessionConfig = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(session(sessionConfig));

app.use(express.urlencoded({extended: true  }));



app.get('/', (req,res) => {
    res.send('Hello');
})

app.listen(3000,console.log('Server running'));