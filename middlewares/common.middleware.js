const {CustomError} = require("../errors");
const {Types} = require("mongoose");

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
};
