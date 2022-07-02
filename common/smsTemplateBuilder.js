const {smsActionEnum} = require("../enums");

module.exports = {
    [smsActionEnum.WELCOME]: (name) => {
        return `Hi ${name}, welcome on our platform`;
    },
};
