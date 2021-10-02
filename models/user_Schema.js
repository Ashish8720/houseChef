const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new Schema({
     email : {
         type : String,
         required : true
     }
});

//built plugin from passport-local-mongoose to add the username and password 
// below line will add username and password field in our existing userSchema
UserSchema.plugin(passportLocalMongoose);


//exporting the userSchema
module.exports = mongoose.model('User' , UserSchema);

