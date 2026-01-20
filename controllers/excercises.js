const Excercise = require('../models/excercise');

module.exports.viewExcercises = async(req,res) => {
    const excercises = await Excercise.find({user: req.user.userId});
    res.json({excercises});
}

module.exports.createExcercise = async(req,res) => {
    console.log(req.user)
    const excercise = new Excercise(req.body);
    excercise.user = req.user.userId;
    await excercise.save();
    res.json({excercise});
}

module.exports.showExcercise = async(req,res) => {
    const {id} = req.params;
    const excercise = await Excercise.findById(id);
    if(!excercise){ return res.status(404).json('That excercise does not exist') };
    if(excercise.user == req.user.userId){
        res.json({excercise});
    } else {
        res.status(403).json({message: "Unauthorized"});
    }
}

module.exports.updateExcercise = async(req,res) => {
    const {id} = req.params;
    const excercise = await Excercise.findById(id);
    if(!excercise){ return res.status(404).json('That excercise does not exist') }
    if(excercise.user.equals(req.user.userId)){
        const updatedExcercise = await Excercise.findByIdAndUpdate(id, req.body, {new:true});
        res.json({updatedExcercise})
    } else {
        res.status(403).json({message: "Unauthorized"});
    }
}

module.exports.deleteExcercise = async(req,res) => {
    const {id} = req.params;
    const excercise = await Excercise.findByIdAndDelete(id);
    if(!excercise){ return res.status(404).json('That excercise does not exist') }
    if(excercise.user.equals(req.user.userId)){
        res.json(`Excercise ${id} deleted`);
    } else {
        res.status(403).json({message: "Unauthorized"});
    }
}