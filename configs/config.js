module.exports = {
    PORT: process.env.PORT || 5001,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/test',

    ACCESS_TOKEN: process.env.ACCESS_TOKEN || 'access_token',
    REFRESH_TOKEN: process.env.REFRESH_TOKEN || 'refresh_token',

    FORGOT_PASS_ACTION_SECRET: process.env.FORGOT_PASS_ACTION_SECRET || 'fgt_pass',
    AUTHORIZATION: process.env.AUTHORIZATION,

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'email@email.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '1234567890',
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',

    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_NUMBER: process.env.TWILIO_NUMBER,

    AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
    AWS_S3_BUCKET_URL: process.env.AWS_S3_BUCKET_URL,
};
