const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/dec');

const {userRouter} = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);

app.use('*', ((req, res) => {
    res.status(404).json('Route not found');
}));

app.use((err, req, res, next) => {
    res
        .status(err.status || 400)
        .json({
            error: err.message || 'Unknown Error',
            code: err.status,
        });
});

app.listen(5000, () => {
    console.log('Started on port 5000')
})




