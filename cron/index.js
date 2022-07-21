const cron = require('node-cron');

const deleteOldOAuthTokens = require('./remove-old-oauth-tokens.cron');

module.exports = () => {
    // */10 * * * * * - every 10 sec, 0 0 1 * * - один раз в місяць 1-го числа - crontab guru
    cron.schedule('0 0 1 * *', deleteOldOAuthTokens);
};
