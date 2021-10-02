//this is a validation schema for add new item or updating the existing recipe item in our app
// this will only work on form and check the validation

const Joi = require("joi");


// validation schema for recipe item
module.exports.Recipe_Schema = Joi.object({
    recipe : Joi.object({
        title  : Joi.string().required(),
    //  image : Joi.string().required(),
        price : Joi.number().required().min(0),
        location : Joi.string().required(),
        category : Joi.string().required(),
        description : Joi.string().required()

    }).required(),
    deleteImages : Joi.array()
});

// validation schema for making new comments
module.exports.Comment_Schema = Joi.object({
    comment : Joi.object({
       rating : Joi.number().required().min(1).max(5),
        response : Joi.string().required(),

    }).required()
});