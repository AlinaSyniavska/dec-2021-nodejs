const jwt = require('jsonwebtoken');

const {config} = require("../configs");
const {CustomError} = require("../errors");
const {tokenTypeEnum, emailActionEnum} = require("../enums");
const {FORGOT_PASSWORD} = require("../enums/email-action.enum");

module.exports = {
    generateAuthTokens: (payload = {}) => {
        const access_token = jwt.sign(payload, config.ACCESS_TOKEN, {expiresIn: '15m'});
        const refresh_token = jwt.sign(payload, config.REFRESH_TOKEN, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        }
    },

    generateActionToken: (actionType, payload = {}) => {
        let secretWord = '';
        let expiresIn = '7d';

        switch (actionType) {
            case FORGOT_PASSWORD:
                secretWord = config.FORGOT_PASS_ACTION_SECRET;
                break;

            default:
                throw new CustomError('Wrong action type', 500);
        }

        return jwt.sign(payload, secretWord, {expiresIn});
    },

    checkToken: (token = '', tokenType = tokenTypeEnum.ACCESS) => {
        try {
            let secret;

            if (tokenType === tokenTypeEnum.ACCESS) secret = config.ACCESS_TOKEN;
            if (tokenType === tokenTypeEnum.REFRESH) secret = config.REFRESH_TOKEN;

            return jwt.verify(token, secret);
        } catch (e) {
            throw new CustomError('Token not valid', 401);
        }
    },

    checkActionTypeToken: (token = '', actionType) => {
        try {
            let secretWord = '';

            switch (actionType) {
                case FORGOT_PASSWORD:
                    secretWord = emailActionEnum.FORGOT_PASSWORD;
                    break;

                default:
                    return new CustomError('Wrong action type', 500);
            }

            return jwt.verify(token, secretWord);
        } catch (e) {
            // throw new CustomError('Token not valid', 401);
            throw new Error(e.message);
        }
    }
};
