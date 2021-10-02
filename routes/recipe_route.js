//dependencies for recipe route
const express = require("express");
const Router = express.Router();
const recipe= require("../models/houseChef_Schema");
const {validateItem} = require("../validations/validate_middleware.js")
const {isLoggedIn , isOwned} = require("../middlewares/authentication.js")
const app = require("../controllers/recipe.js")
const WrapAsync = require("../utils/WrapAsync")
const multer = require('multer');
const {storage} = require("../cloudinary_config")
const upload = multer({storage})












//!--------------- routes-------------------------!

// default options for category in our app
let options = ['vegetarian' , 'nonvegetarian' , 'desert'];


// route for access the home page of our app
Router.get("/", WrapAsync(app.index))

Router.get("/category" , WrapAsync(app.category))


//route for accesing the form to add the new item
Router.get("/new" , isLoggedIn , app.renderNewForm);

//route for posting the new added item to the home page
Router.post("/", isLoggedIn, upload.array("image"),validateItem, WrapAsync(app.AddNewItem));


// route for access the show page of our app
Router.get("/:id" , WrapAsync(app.showItem));


//route for accessing the edit item page 
Router.get("/:id/edit" ,isLoggedIn, isOwned , WrapAsync(app.renderEditForm));


// route for updating the existing item in our app
Router.patch("/:id" , isLoggedIn, isOwned,upload.array("image"), validateItem ,  WrapAsync(app.updateItem));

// route for deleting the existing item from our app
Router.delete("/:id" ,isLoggedIn,isOwned, WrapAsync(app.deleteItem));


//export the module recipe_route to main file
module.exports = Router