const Joi = require('Joi');

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        imgSource: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
    }).required()
});