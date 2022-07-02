const Joi = require('joi');

const {emailValidator, passwordValidator, phoneValidator} = require("./common.validator");

module.exports = {
    newUserValidator: Joi.object({
        name: Joi.string().alphanum().trim(true).min(2).max(100).required(),
        age: Joi.number().integer().min(1).max(120),
        email: emailValidator.required(),
        password: passwordValidator.required(),
        phone: phoneValidator.required(),
    }),

    updateUserValidator: Joi.object({
        name: Joi.string().alphanum().trim(true).min(2).max(100),
        age: Joi.number().integer().min(1).max(120),
    }),
};

