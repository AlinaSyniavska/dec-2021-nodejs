const express = require('express');
const {fileService} = require('./services');

const app = express();


app.listen(5000, () => {
    console.log('Started on port 5000')
})




