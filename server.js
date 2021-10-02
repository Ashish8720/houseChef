
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

//dependencies for server

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError")

const recipes_route = require("./routes/recipe_route");
const comment_route = require("./routes/comment_route");
const user_route = require("./routes/user_routes")
const session = require("express-session");
const flash = require("connect-flash");
const User = require('./models/user_Schema')
const Passport = require('passport')
const LocalStrategy = require('passport-local')
const MongoStore = require('connect-mongo');

//defining the packages
const  server = express();
const PORT = process.env.PORT || 3000;

const dbUrL = 'mongodb://localhost:27017/houseChef'
//mongoose connection established
mongoose.connect(dbUrL, 
{
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false,
  useCreateIndex :  true 
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to database")
});


// MIDDLEWARES 

// middle ware to lookup for ejs extension file only
server.set( "view engine" , "ejs")
// middleware for accesing the views directory from any path 
server.set('views' , path.join(__dirname, "views"));
// middleware for parsing encoded data form the url(specially the data get from POST method)
server.use(express.urlencoded({ extended: true }));
//middleware to the change the http method(espically for PUT , PATCH , DELETE from GET or POST)
server.use(methodOverride("_method"));

server.use( express.static(path.join(__dirname , "/public")));




// express session object for storing the information in server storage , in this case it is memory
const sessionConfig = {
  name : "developement",
    secret : "letsrevealthesecret",  // key to for accesing the server storage where session of client information is stored
    resave : false,
    saveUninitialized : true,
    store: MongoStore.create({ mongoUrl: dbUrL }),
  // cookie is a send to the client browser
    cookie : {
        httpOnly : true,
        //expries cookie in  1 week
 // today's date + 1000ms(1sec) + 60sec(1min) + 60min(1 hour) + 24hour(1day) + 7day(1week)
        expires : Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAGE : 1000 * 60 * 60 * 24 * 7
    }
}

server.use(session(sessionConfig))
server.use(flash());

//it will initialize or use the passport for our app
server.use(Passport.initialize());
// it will use the express-session to send cookies to know about the user 
server.use(Passport.session());

// it will use the local stragegy/passport local for authentication .
// note : we can use other strategy for authentication like google authentication , facebook auth , instagram auth etc
// for that we need to require those libararies in our app
Passport.use(new LocalStrategy(User.authenticate()));

// it is use for  starting the connection between user and server by sending signed cookies to user browser to know about the user
Passport.serializeUser(User.serializeUser())
// it will use for end the connection between user browser and server
Passport.deserializeUser(User.deserializeUser())


server.use((req,res,next)=>{
  if(!['/login' , '/'].includes(req.originalUrl)){
    req.session.returnTo = req.originalUrl;
  }
  res.locals.CurrentUser = req.user;
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  next();
})



server.use("/" , user_route)
server.use("/home" , recipes_route)
server.use("/home/:id/comment" , comment_route)


server.all('*' , (req,res,next)=>{
    next(new ExpressError("page not found" , 404))
});

server.use((err,req,res,next)=>{
   const {statusCode = "500" , message = "something went wrong"} = err
   if(!err.message){
       res.send = "something went wrong"
   }
   res.status(statusCode).render("partials/error", {err})
 
})

    




server.listen(PORT , (req,res)=>{
    console.log("server is running on 3000")
});