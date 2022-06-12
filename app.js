const express = require('express');
const {fileService} = require('./services');

const app = express();

// fileService.append('./dataBase/data.txt', 'Append some data to data.txt. ').then();
// fileService.append('./dataBase/data2.txt', 'Append some data2 to data2.txt. ').then();

// fileService.readDir('./dataBase');

fileService.readDataStream('./dataBase/data3.txt').then();

app.listen(5000, () => {
    console.log('Started on port 5000')
})




