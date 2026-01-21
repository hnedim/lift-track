const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

module.exports.register = async(req,res) => {
    const {email, password} = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser) return res.status(400).json({error: 'User exists'});

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({email, passwordHash});
    await user.save();

    const token = jwt.sign({userId: user._id, email: user.email}, JWT_SECRET, {expiresIn: '1h'});
    res.json({token});
}

module.exports.login = async(req,res) => {
    const {email, password} = req.body;
    
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({error: 'Invalid credentials'});

    const match = await bcrypt.compare(password, user.passwordHash);
    if(!match) return res.status(400).json({error: 'Invalid credentials'});

    const token = jwt.sign({userId: user._id, email: user.email}, JWT_SECRET, {expiresIn: '1h'});
    res.json({token});
}

module.exports.viewUser = async(req,res) => {
    const user = await User.find({_id: req.user.userId});
    res.json({user});
}
