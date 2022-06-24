const {userService} = require("../services");
const {CustomError} = require("../errors");
const {userValidator, userQueryValidator} = require("../validators");

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const {id} = req.params;

            const user = await userService.findOne({_id: id});

            if(!user){
                return next(new CustomError(`User with id ${id} not found`, 404));
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserUniq: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findOne({email});

            if(user){
                return next(new CustomError(`User with email ${email} is exist`, 409));
            }

            // req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValidForCreate: (req, res, next) => {
        try {
            const {error, value} = userValidator.newUserValidator.validate(req.body);

            if (error) {
                return next(new CustomError(error.details[0].message));
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValidForUpdate: (req, res, next) => {
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body);
            if(error) {
                return next(new CustomError(error.details[0].message));
            }
            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserQueryValid: (req, res, next) => {
        try {
            const {error, value} = userQueryValidator.allUsersValidator.validate(req.query);
            if(error) {
                return next(new CustomError(error.details[0].message));
            }
            req.query = value;
            next();
        } catch (e) {
            next(e);
        }
    },
};
