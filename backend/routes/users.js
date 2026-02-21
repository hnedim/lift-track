const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const { validateRegistration, validateLogin } = require("../utils/middleware");

router.post("/register", validateRegistration, catchAsync(users.register));
router.get("/user", isLoggedIn, catchAsync(users.viewUser));
router.post("/login", validateLogin, catchAsync(users.login));
router.post("/logout", catchAsync(users.logout));

module.exports = router;
