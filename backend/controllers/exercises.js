const Exercise = require("../models/exercise");

module.exports.viewExercises = async (req, res) => {
  const exercises = await Exercise.find({ user: req.user._id });
  res.json({ exercises });
};

module.exports.createExercise = async (req, res) => {
  const exercise = new Exercise(req.body);
  exercise.user = req.user._id;
  await exercise.save();
  res.json({ exercise });
};

module.exports.showExercise = async (req, res) => {
  const { id } = req.params;
  const exercise = await Exercise.findById(id);
  if (!exercise) {
    return res.status(404).json("That exercise does not exist");
  }
  if (exercise.user.equals(req.user._id)) {
    res.json({ exercise });
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
};

module.exports.updateExercise = async (req, res) => {
  const { id } = req.params;
  const exercise = await Exercise.findById(id);
  if (!exercise) {
    return res.status(404).json("That exercise does not exist");
  }
  if (exercise.user.equals(req.user._id)) {
    const updatedExercise = await Exercise.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ updatedExercise });
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
};

module.exports.deleteExercise = async (req, res) => {
  const { id } = req.params;
  const exercise = await Exercise.findByIdAndDelete(id);
  if (!exercise) {
    return res.status(404).json("That exercise does not exist");
  }
  if (exercise.user.equals(req.user._id)) {
    res.json(`Exercise ${id} deleted`);
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
};
