const Joi = require("joi");

//for authentification schema
exports.authontification=Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
    email:Joi.string().required(),
    password:Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    location: Joi.string().min(3).max(30),
    genere: Joi.string(),
});

//for profile schema
exports.profileAuthentification=Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
    email:Joi.string().required(),
    phone:Joi.string().length(10).required(),
    location: Joi.string().min(3).max(30),
    genere: Joi.string(),
});

//for movie schema
exports.movieAuthentification=Joi.object({
    title: Joi.string().alphanum().min(3).max(30),
    genere: Joi.string(),
    releasedate:Joi.number(),
});


