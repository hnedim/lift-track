const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Excercise = require('../models/excercise');

module.exports.viewExcercises = async(req,res) => {
    const excercises = await Excercise.find();
    res.json({excercises});
}

module.exports.createExcercise = async(req,res) => {
    const excercise = new Excercise(req.body);
    await excercise.save();
    res.json({excercise});
}

module.exports.showExcercise = async(req,res) => {
    const {id} = req.params;
    const excercise = await Excercise.findById(id);
    if(excercise){
        res.json({excercise});
    } else {
        return res.status(404).json('That excercise does not exist')
    }
}

module.exports.updateExcercise = async(req,res) => {
    const {id} = req.params;
    const excercise = await Excercise.findByIdAndUpdate(id, req.body);
    if(excercise){
        res.json({excercise});
    } else {
        return res.status(404).json('That excercise does not exist')
    }
}

module.exports.deleteExcercise = async(req,res) => {
    const {id} = req.params;
    const excercise = await Excercise.findByIdAndDelete(id);
    if(excercise){
        res.json(`Excercise ${id} deleted`);
    } else {
        return res.status(404).json('That excercise does not exist')
    }
}