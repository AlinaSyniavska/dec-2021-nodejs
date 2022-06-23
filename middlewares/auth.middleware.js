const {CustomError} = require("../errors");
const {tokenService} = require("../services");
const {OAuth} = require("../dataBase");
module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization');

            if(!accessToken) {
                return next(new CustomError('No token', 401));
            }

            tokenService.checkAccessToken(accessToken);

            const tokenInfo = await OAuth.findOne({access_token: accessToken}).populate('userId');

            if(!tokenInfo) {
                return next(new CustomError('No token', 401));
            }

            req.user = tokenInfo.userId;

            next();
        } catch (e) {
            next(e);
        }
    },
};
