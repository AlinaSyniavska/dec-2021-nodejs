const {CustomError} = require("../error");

module.exports = {
    checkUserToCreate: (req, res, next) => {
        try {
            const {name = '', email = '', age = 0, password = ''} = req.body;

            const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

            if (!name || !email || !password) {
                throw new CustomError('Some field is missing');
            }

            if (name.length < 2) {
                throw new CustomError('Name should include at least 2 symbols');
            }

            if (age < 0 || age > 100) {
                throw new CustomError('Age is not valid');
            }

            if (password.length < 5) {
                throw new CustomError('Password should include at least 5 symbols');
            }

            const valid = emailRegex.test(email);
            const parts = email.split("@");
            const domainParts = parts[1].split(".");

            if (email.length > 254 || !valid || parts[0].length > 64 || domainParts.some((part) => {part.length > 63})) {
                throw new CustomError('Email is not valid');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserId: (req, res, next) => {
        try {
            const {userId = ''} = req.params;

            if (userId.length !== 24) {
                throw new CustomError('Mongo Id is not valid', 403)
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isEmailRegistered: (req, res, next) => {
        try {




            next();
        } catch (e) {
           next(e);
        }
    },

}