const recipe= require("../models/houseChef_Schema");
let options = ['vegetarian' , 'nonvegetarian' , 'desert'];
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const MY_ACCESS_TOKEN = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: MY_ACCESS_TOKEN });
const {cloudinary} = require("../cloudinary_config")

module.exports.index = async(req,res,next)=>{
        // find the documents from notes database and save it to variable
         let index_recipe = await recipe.find({})
         
         res.render("app/home" , { index : index_recipe})
     
  }
   module.exports.category = async(req,res,next)=>{
    // find the documents from notes database and save it to variable
    console.log(req.query)
     res.send("yoo ")
    
 
}

    
module.exports.renderNewForm = (req,res)=>{
        //here options array is given to new item form for category data
        res.render("app/new" , {options})
    }


module.exports.AddNewItem = async(req,res,next)=>{

    const geoData = await geocoder.forwardGeocode({
        query : req.body.recipe.location,
        limit : 1

    })
    .send()

        const Recipe_item = new recipe(req.body.recipe)  //create the new mongoose schema or instance
            Recipe_item.geometry = geoData.body.features[0].geometry
             Recipe_item.publisher = req.user._id;
             Recipe_item.images = req.files.map(f=>({url : f.path , filename : f.filename}))
             await Recipe_item.save();   //save the Recipe item to the database
           
             req.flash('success' , 'successfully posted the item')
           res.redirect(`/home/${Recipe_item._id}`)
       }

module.exports.showItem = async(req,res,next)=>{

        // find the one product by find by ID and save it to variable
        const  info_recipe =  await recipe.findById(req.params.id).populate(
            {path:'comments' ,
             populate : {
                 path : 'name'
             }
             }).populate("publisher")
    
        res.render("app/show" , {info : info_recipe })
    }

    module.exports.renderEditForm = async(req,res,next)=>{
        let edit_recipe_item = await recipe.findById(req.params.id)
        res.render("app/edit" ,  {edit : edit_recipe_item , options})  //two responses is being send one is item data and another is categories array
    }

    module.exports.updateItem = async(req,res,next)=>{
          
        let found_recipe_id = await recipe.findById(req.params.id);
       
         await recipe.findByIdAndUpdate(found_recipe_id , req.body.recipe , {new:true} )
         const img = req.files.map(f=>({url : f.path , filename : f.filename}))
         found_recipe_id.images.push(...img)
        await found_recipe_id.save()
        if(req.body.deleteImages){
            for(let filename of req.body.deleteImages){
               await cloudinary.uploader.destroy(filename);
            }
           await found_recipe_id.updateOne({$pull : {images : {filename : {$in  : req.body.deleteImages}}}})
        }

         req.flash('success' , 'successfully upadated item')
        res.redirect(`/home/${found_recipe_id._id}`)
        
    }

    module.exports.deleteItem = async(req,res,next)=>{
        // let {id} = await recipe.findById(req.params.id);
        let found_recipe_id = await recipe.findById(req.params.id);
         await recipe.findByIdAndDelete(found_recipe_id)
         req.flash('success' , 'deleted the item the succesfully')
        res.redirect("/home")
    }