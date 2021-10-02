// import the moongose 
const mongoose = require("mongoose");
const User = require("./user_Schema")




// create a schema variable 
const Schema = mongoose.Schema;

//defining the commentschema
const CommentSchema = new Schema({
    name :  {
        type:Schema.Types.ObjectId,
        ref : "User"
        
    },
    response : {
        type :  String,
    },
    rating : {
        type : Number,
    }
    

})

module.exports = mongoose.model("Comment" , CommentSchema)

