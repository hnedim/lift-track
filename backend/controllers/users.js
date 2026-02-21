const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { generateToken } = require("../utils/utils");

module.exports.register = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User exists" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ email, passwordHash });
  await user.save();

  generateToken(user._id, res);
  res.status(201).json({ user });
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  generateToken(user._id, res);
  res.status(201).json({ user });
};

module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out succesfully" });
};

module.exports.viewUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ user });
};
