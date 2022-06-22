const Joi = require("joi");

const {regexConst} = require("../configs");

module.exports = {
    emailValidator: Joi.string().regex(regexConst.EMAIL_REGEXP).lowercase().trim(true),
    passwordValidator: Joi.string().regex(regexConst.PASSWORD_REGEXP),
}
