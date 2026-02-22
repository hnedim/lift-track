const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const users = require("./routes/users.js");
const exercises = require("./routes/exercises.js");
const workouts = require("./routes/workouts.js");
const workoutSessions = require("./routes/workout-sessions.js");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db.js");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const sessionConfig = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
};

// General API rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later",
});

// Stricter limiter for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // only 5 requests per 15 minutes
  message: "Too many login attempts, please try again later",
});

app.use(session(sessionConfig));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

// Apply to all routes
app.use("/", limiter);

// Apply stricter limits to specific routes
app.use("/api/v1/login", authLimiter);
app.use("/api/v1/register", authLimiter);

app.use("/api/v1/", users);
app.use("/api/v1/exercises", exercises);
app.use("/api/v1/workouts", workouts);
app.use("/api/v1/workoutSessions", workoutSessions);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .json({ statusCode, message: message || "Something went wrong" });
});

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server started on PORT: 3000");
  });
});
