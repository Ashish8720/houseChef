// import the moongose 
const mongoose = require("mongoose");
const Comment = require("./comment_Schema")
// const User = require("./user_Schema")



// create a schema variable 
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url : String,
    filename  : String
})

ImageSchema.virtual('Thumbnail').get(function () {
  return this.url.replace("/upload" , "/upload/w_200")
});
//make a blueprint or schema for our note app
const HouseChefSchema = new Schema({
    
    title :{
        type:String,
    }, 
    
    images :[ImageSchema] ,

    geometry : {
    
       type:  {
             type:String,
             enum : ['Point'],
             required : true,
        },
        coordinates : {
            type: [Number],
            required : true
        }
    },
    description : 
    {
        type:String,
    },
    price : 
    {
       type : Number,
       min : 0
    } ,
   location :  {
         type : String
    },
    category : 
    {
        type : String,
        lowerCase: true,
        enum : ['vegetarian' , 'nonvegetarian' , 'desert']
        
    },
    publisher :{
        type:Schema.Types.ObjectId,
        ref : 'User'
    },
    comments : [
        {
            type:Schema.Types.ObjectId,
            ref : "Comment"
        }

    ]
    

    

});

//post mongoose middleware for deleting the recipe item as well their associated comments
// note : this is a post middleware of mongoose and it will only trigger with same operation which was mentioned in main file ex- here findOneAndDelete is used in delete route for comments hence here which have to used the same to delte the associated comments of a particular recipe

//here we use this middle ware in houseSchema because refernce  array is in houseSchema 
HouseChefSchema.post('findOneAndDelete' , async(document)=>{
   //printing the document which was deleted
  
   if(document){
     await  Comment.deleteMany({
         //finding the all the id's in comments array and deleting it
           _id:{
               $in : document.comments
           }
       })
   }
})

// export it to our main server 
module.exports = mongoose.model("recipe" , HouseChefSchema)

