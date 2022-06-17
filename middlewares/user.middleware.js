const {userService} = require("../services");
const {CustomError} = require("../errors");

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
            const {name, email, age, password} = req.body;

            const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

            if (!name || !email || !password) {
                return next(new CustomError('Some field is missing'));
            }

            if (name.length < 2) {
                return next(new CustomError('Name should include at least 2 symbols'));
            }

            if (!Number.isInteger(age) || age < 0 || age > 100) {
                return next(new CustomError('Age is not valid'));
            }

            if (password.length < 8) {
                return next(new CustomError('Password should include at least 8 symbols'));
            }

            const valid = emailRegex.test(email);
            const parts = email.split("@");
            const domainParts = parts[1].split(".");

            if (email.length > 254 || !valid || !email.includes('@') || parts[0].length > 64 || domainParts.some((part) => {part.length > 63})) {
                return next(new CustomError('Email is not valid'));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValidForUpdate: (req, res, next) => {
        try {
            const {name, age} = req.body;

            if (age && !Number.isInteger(age) || age < 0 || age > 100) {
                return next(new CustomError('Age is not valid'));
            }

            if (name && name.length < 2) {
                return next(new CustomError('Name should include at least 2 symbols'));
            }

            req.dataForUpdate = {name, age};
            next();
        } catch (e) {
            next(e);
        }
    },
};
