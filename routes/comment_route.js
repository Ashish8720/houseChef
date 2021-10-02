// required dependencies for comment route
const express = require("express");
const Router = express.Router({mergeParams : true});
const recipe= require("../models/houseChef_Schema");
const comment = require("../models/comment_Schema");
const {validateComment} = require("../validations/validate_middleware.js")
const {isLoggedIn , isOwnedComment} = require("../middlewares/authentication.js")
const WrapAsync = require("../utils/WrapAsync")
const Comments = require("../controllers/comment.js")


// route for show page for making new comment

Router.get("/new" ,isLoggedIn,WrapAsync(Comments.renderCommentForm));

// Routes for posting comments in particular recipe

Router.post("/" ,isLoggedIn, validateComment , WrapAsync(Comments.makeComment));

// route for delete the existing comment
  Router.delete("/:commentId", isLoggedIn, isOwnedComment , WrapAsync(Comments.deleteComment));

//export the comment routre model
  module.exports = Router