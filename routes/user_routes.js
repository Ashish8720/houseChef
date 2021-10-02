const express = require("express");
const Router = express.Router();
const User = require('../models/user_Schema');
const WrapAsync = require("../utils/WrapAsync");
const Passport = require("passport");
const credential = require("../controllers/credentials.js")



//routes to accoess the dashboard
Router.get("/",(credential.dashboard));




Router.get('/register' , (credential.renderRegisterForm));

Router.post('/register' , WrapAsync(credential.registerUser));

Router.get('/login', (credential.renderLoginForm));

Router.post("/login" ,Passport.authenticate('local' , {failureflash : true , failureRedirect : '/login'}) , credential.loginUser )


Router.get('/logout', (credential.logout))

module.exports = Router;