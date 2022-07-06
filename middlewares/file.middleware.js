const {constant} = require("../configs");
const {CustomError} = require("../errors");

module.exports = {
    checkUserAvatar: async (req, res, next) => {
        try {
            if(!req.files?.avatar) {
                return next();
            }

            const {mimetype, size} = req.files.avatar;

            if(size > constant.IMAGE_MAX_SIZE) {
                return next(new CustomError(`Max size ${constant.IMAGE_MAX_SIZE/1024/1024} MB`));
            }

            if(!constant.IMAGE_MIMETYPES.includes(mimetype)) {
                return next(new CustomError('Wrong file type'));
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
