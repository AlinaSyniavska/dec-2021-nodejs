const {emailActionEnum} = require("../enums");

module.exports = {
    [emailActionEnum.WELCOME]: {
        subject: 'Welcome on board',
        template: 'welcome'
    },

    [emailActionEnum.FORGOT_PASSWORD]: {
        subject: 'Opps looks like you forgot password',
        template: 'forgot-password'
    },

    [emailActionEnum.LOGOUT]: {
        subject: 'User was logout',
        template: 'logout'
    },
};
