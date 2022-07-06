const express = require('express');
const expressFileUpload = require('express-fileupload');
const mongoose = require('mongoose');
// const cors = require('cors');
const path = require("path");

require('dotenv').config({path: path.join(process.cwd(), 'environments', `${process.env.MODE}.env`)});

const { config } = require('./configs');
const { userRouter, authRouter } = require('./routes');

mongoose.connect(config.MONGO_URL);

const app = express();
// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressFileUpload());
app.use('/users', userRouter);
app.use('/auth', authRouter);

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
});
