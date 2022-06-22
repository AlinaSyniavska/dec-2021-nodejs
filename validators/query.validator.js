const Joi = require("joi");

const {emailValidator} = require("./common.validator");

module.exports = {
    allUsersValidator: Joi.object({
        name: Joi.string().alphanum().trim(true).min(2).max(100),
        age: Joi.number().integer().min(1).max(120),
        email: emailValidator,
    }),
};
