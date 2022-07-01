module.exports = {
    PORT: process.env.PORT || 5001,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/test',
    ACCESS_TOKEN: process.env.ACCESS_TOKEN || 'access_token',
    REFRESH_TOKEN: process.env.REFRESH_TOKEN || 'refresh_token',
    AUTHORIZATION: process.env.AUTHORIZATION,
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'email@email.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '1234567890',
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',
};
