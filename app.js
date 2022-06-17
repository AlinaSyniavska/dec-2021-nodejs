const express = require('express');
const mongoose = require('mongoose');

const {configs} = require("./config");
const {userRouter} = require("./routes");

mongoose.connect(configs.MONGO_URL);

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
            code: err.status || 400,
        });
});

app.listen(configs.PORT, () => {
    console.log(`Started on port ${configs.PORT}`);
})




