const jwt = require('jsonwebtoken');

const {config} = require("../configs");
const {CustomError} = require("../errors");

module.exports = {
    generateAuthTokens: (payload = {}) => {
        const access_token = jwt.sign(payload, config.ACCESS_TOKEN, {expiresIn: '15m'});
        const refresh_token = jwt.sign(payload, config.REFRESH_TOKEN, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        }
    },

    checkAccessToken: (token = '') => {
        try {
            return jwt.verify(token, config.ACCESS_TOKEN);
        } catch (e) {
            throw new CustomError('Token not valid', 401);
        }
    },
};
