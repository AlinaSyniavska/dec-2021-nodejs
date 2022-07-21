const {CustomError} = require("../errors");
const {Types} = require("mongoose");
const {userQueryValidator} = require("../validators");

module.exports = {
    isIdValid: (req, res, next) => {
        try {
            const {id} = req.params;

            if (!Types.ObjectId.isValid(id)) {
                return next(new CustomError('Not valid ID'));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isDataValid: (validationSchema, dataType = 'body') => async (req, res, next) => {
        try {
            const {error, value} = validationSchema.validate(req[dataType]);
            if(error) {
                return next(new CustomError(error.details[0].message));
            }
            req[dataType] = value;
            next();
        } catch (e) {
            next(e);
        }
    },
};
