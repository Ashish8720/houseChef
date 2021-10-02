// this file is to seed the data in our data base initally
const mongoose = require("mongoose");
// require the schema from models
const recipe = require("./models/houseChef_Schema")
const Comment = require("./models/comment_Schema")

// open connetion between moongoose and  mongoDB 
mongoose.connect('mongodb://localhost:27017/houseChef', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected from seed to database")
});

// demo data for seeding to the database
 const Recipe_Book = [
  {

     publisher : "611f6a9bfcb2892688efcb7c",
    title : "Red hot Pizza",
    images : [{
      url: 'https://res.cloudinary.com/dkquw3h0q/image/upload/v1629737865/HouseChef/zqcwq9sfjsiwtssocwzm.jpg',
      filename: 'HouseChef/zqcwq9sfjsiwtssocwzm'
    },
    {
      url: 'https://res.cloudinary.com/dkquw3h0q/image/upload/v1629737865/HouseChef/oabp6tnskvkmxq9bxlpc.jpg',
      filename: 'HouseChef/oabp6tnskvkmxq9bxlpc'
    }
    ],
    geometry : {
      type : 'Point',
      coordinates : [72.83333, 18.96667],
    },
    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tellus pretium, fringilla nisi sit amet, condimentum dui. Nam tempor ante a nulla condimentum dictum. Nulla euismod quis ipsum quis pulvinar. Cras et eros quam. Vestibulum dignissim diam velit, vitae tincidunt sapien ornare non. Ut at libero vulputate, pellentesque est vitae, venenatis lorem. Nulla sed feugiat ex, finibus vehicula turpis. Aliquam ipsum nunc, fermentum quis sollicitudin et, lacinia vitae lectus.",
    price : 240,
    location : "gwalior India",
    category : 'vegetarian'
  },
  {
    publisher : "611f6a9bfcb2892688efcb7c",
    title : "Sweet crisp Burger",
    images : [
      {
        url: 'https://res.cloudinary.com/dkquw3h0q/image/upload/v1629737865/HouseChef/zqcwq9sfjsiwtssocwzm.jpg',
        filename: 'HouseChef/zqcwq9sfjsiwtssocwzm'
      },
      {
        url: 'https://res.cloudinary.com/dkquw3h0q/image/upload/v1629737865/HouseChef/oabp6tnskvkmxq9bxlpc.jpg',
        filename: 'HouseChef/oabp6tnskvkmxq9bxlpc'
      }
    ],
    geometry : {
      type : 'Point',
      coordinates : [72.83333, 18.96667],
    },
    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tellus pretium, fringilla nisi sit amet, condimentum dui. Nam tempor ante a nulla condimentum dictum. Nulla euismod quis ipsum quis pulvinar. Cras et eros quam. Vestibulum dignissim diam velit, vitae tincidunt sapien ornare non. Ut at libero vulputate, pellentesque est vitae, venenatis lorem. Nulla sed feugiat ex, finibus vehicula turpis. Aliquam ipsum nunc, fermentum quis sollicitudin et, lacinia vitae lectus.",
  
    price : 140,
    location : "gwalior India",
    category : 'nonvegetarian'
  },
  {
    publisher : "611f6a9bfcb2892688efcb7c",
      title : "Caramlle choclate cake",
     images : [
      {
        url: 'https://res.cloudinary.com/dkquw3h0q/image/upload/v1629737865/HouseChef/zqcwq9sfjsiwtssocwzm.jpg',
        filename: 'HouseChef/zqcwq9sfjsiwtssocwzm'
      },
      {
        url: 'https://res.cloudinary.com/dkquw3h0q/image/upload/v1629737865/HouseChef/oabp6tnskvkmxq9bxlpc.jpg',
        filename: 'HouseChef/oabp6tnskvkmxq9bxlpc'
      }
     ],
     geometry : {
      type : 'Point',
      coordinates : [72.83333, 18.96667],
    },
      description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tellus pretium, fringilla nisi sit amet, condimentum dui. Nam tempor ante a nulla condimentum dictum. Nulla euismod quis ipsum quis pulvinar. Cras et eros quam. Vestibulum dignissim diam velit, vitae tincidunt sapien ornare non. Ut at libero vulputate, pellentesque est vitae, venenatis lorem. Nulla sed feugiat ex, finibus vehicula turpis. Aliquam ipsum nunc, fermentum quis sollicitudin et, lacinia vitae lectus.",
      
      price : 300,
      location : "gwalior India",
      category : 'desert'
    
  }



]
// make a function to delete prvious database and add new one to database

const SeedDB = async () => {
// wait for data to be deleted from data base
     
await recipe.deleteMany({});
await Comment.deleteMany({});




// make an array of data using insertmany command 
  recipe.insertMany (Recipe_Book)

};
//calling our function which we declare earlier and close the moongoose connection ov=nce done
SeedDB().then((data)=>{
  console.log(data);
  
})

  





