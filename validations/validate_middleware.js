const {Recipe_Schema , Comment_Schema} = require("../validations/Item_schema.js")
const ExpressError = require("../utils/ExpressError")


//middleware for validation for making new recipe or updating the existing one
module.exports.validateItem = (req,res,next)=>{
    
    const {error} = Recipe_Schema.validate(req.body);
   
   if(error){
       const msg = error.details.map(el=>el.message).join(',')
 
       throw new ExpressError(msg,400)
   }else{
       next();
   }
 
 }


 //middleware for validation for making new comments 
module.exports.validateComment = (req,res,next)=>{
    
    const {error} = Comment_Schema.validate(req.body);
   
   if(error){
       const msg = error.details.map(el=>el.message).join(',')
       throw new ExpressError(msg,400)
   }
   else{
       next();
   }
 
 }