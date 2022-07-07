require('dotenv').config();
const {config} = require('./configs');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const {userRouter, authRouter} = require('./routes');
const cronRun = require('./cron');

mongoose.connect(config.MONGO_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

if (config.MODE !== 'prod') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

// app.use(cors(_configureCors()));
app.use('/users', userRouter);
app.use('/auth', cors(_configureCors()), authRouter);

app.use('*', (req, res) => {
    res.status(404).json('Route not found');
});

app.use((err, req, res, next) => {
    res.status(err.status || 400).json({
        error: err.message || 'Unknown Error',
        code: err.status || 400,
    });
});

app.listen(config.PORT, () => {
    console.log(`Started on port ${config.PORT}`);

    cronRun();
});

function _configureCors() {
    const whitelist = config.CORS_WHITE_LIST.split(';');

    return {
        origin: (origin, callback) => {
            if (whitelist.includes(origin)) {
                return callback(null, true);
            }

            callback(new Error('Not allowed by CORS'));
        }
    };
}

