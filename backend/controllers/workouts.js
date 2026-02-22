const Workout = require("../models/workout");
const User = require("../models/user");
const Exercise = require("../models/exercise");
const mongoose = require("mongoose");

module.exports.viewWorkouts = async (req, res) => {
  const workouts = await Workout.find({
    user: new mongoose.Types.ObjectId(req.user._id),
  }).populate("exercises");
  res.json({ workouts });
};

// TO FIX
module.exports.createWorkout = async (req, res) => {
  const { exercises } = req.body;
  const userId = req.user._id;

  const exerciseIds = exercises.map((id) => new mongoose.Types.ObjectId(id));

  const exerciseCount = await Exercise.countDocuments({
    _id: { $in: exerciseIds },
    user: userId,
  });

  if (exerciseCount != exercises.length) {
    return res
      .status(403)
      .json({ message: "You can only use your own exercises." });
  }
  const workout = new Workout(req.body);
  workout.user = userId;
  workout.date = new Date();
  await workout.save();
  res.json({ workout });
};

module.exports.showWorkout = async (req, res) => {
  const { id } = req.params;
  const workout = await Workout.findById(id); //REMOVED .POPULATE
  if (!workout)
    res.status(404).json({ message: "That workout does not exist." });
  if (workout.user.equals(req.user._id)) {
    res.json({ workout });
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
};

module.exports.updateWorkout = async (req, res) => {
  const { id } = req.params;
  const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
  if (!workout)
    res.status(404).json({ message: "That workout does not exist." });
  if (workout.user.equals(req.user._id)) {
    res.json({ workout });
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
};

module.exports.deleteWorkout = async (req, res) => {
  const { id } = req.params;
  const workout = await Workout.findByIdAndDelete(id);
  if (!workout)
    res.status(404).json({ message: "That workout does not exist." });
  if (workout.user.equals(req.user._id)) {
    res.json({ workout });
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
};
