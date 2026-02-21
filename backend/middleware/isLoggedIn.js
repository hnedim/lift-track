const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports.isLoggedIn = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token)
    return res.status(401).json({ message: "Unauthorized - no token" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded)
    return res.status(401).json({ message: "Unauthorized - invalid token" });

  const user = await User.findById(decoded.userId).select("-password");

  if (!user) return res.status(404).json({ message: "User not found" });

  req.user = user;
  next();
};
