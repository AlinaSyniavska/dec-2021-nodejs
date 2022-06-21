const Joi = require('joi');

const {regexConst} = require('../config');
const {emailValidator} = require("./share.validator");

const userSubSchema = {
    name: Joi.string().alphanum().trim(true).min(2).max(100),
    age: Joi.number().integer().min(1).max(120)
}

module.exports = {
    newUserValidator: Joi.object({
        // ...userSubSchema,    //'name' must be required

        name: Joi.string().alphanum().trim(true).min(2).max(100).required(),
        age: Joi.number().integer().min(1).max(120),
        email: emailValidator.required(),
        password: Joi.string().regex(regexConst.PASSWORD_REGEXP).required()
    }),

    updateUserValidator: Joi.object({
        /*name: Joi.string().alphanum().trim(true).min(2).max(100),
        age: Joi.number().integer().min(1).max(120)*/
        ...userSubSchema
    }),
}