const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userControllers = require("../controllers/users.js");

router.route("/signup")
.get(userControllers.renderSignUpForm)
.post(wrapAsync(userControllers.signUp));

router.route("/login")
.get( userControllers.renderLogInForm)
.post(
saveRedirectUrl , 
passport.authenticate("local" , 
{failureRedirect: "/login", failureFlash: true}) ,
userControllers.logIn
);

router.get("/logout" , userControllers.logOut);

module.exports  = router;

