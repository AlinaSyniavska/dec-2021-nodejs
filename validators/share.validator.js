const Joi = require("joi");

const {regexConst} = require("../config");

module.exports = {
    emailValidator: Joi.string().regex(regexConst.EMAIL_REGEXP).lowercase()
}