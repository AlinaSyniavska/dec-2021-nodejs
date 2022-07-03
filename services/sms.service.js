const twilio = require('twilio');

const {config} = require("../configs");

const client = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

module.exports = {
    sendSMS: async (phone, message) => {
        try{
            console.log(`SMS start sending | to: ${phone} | message: ${message}`);

            const smsInfo = await client.messages.create({
                from: config.TWILIO_NUMBER,
                to: phone,
                body: message
            });

            console.log(`SMS response | status: ${smsInfo.status} | sid: ${smsInfo.sid}`);
        } catch (e) {
            console.error(`SMS error | to: ${phone} | error: ${e}`);
        }
    },
};
