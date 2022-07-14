const Joi = require("joi");

const {emailValidator} = require("./common.validator");

module.exports = {
    allUsersValidator: Joi.object({
        name: Joi.string().alphanum().trim(true).min(2).max(100),
        age: Joi.number().integer().min(1).max(120),
        email: emailValidator,

        page: Joi.number().integer().min(1),
        perPage: Joi.number().integer().min(1).max(50),
        search: Joi.string().alphanum().trim(true),
        ageGte: Joi.number().integer().min(1).max(120),
        ageLte: Joi.number().integer().min(1).max(120),
    }),
};
