const express = require('express');
const axios = require('axios');
const fs = require('fs/promises');
const users = require('./dataBase/users');

const app = express();

app.get('/', function (req, res) {
    // res.send('Hello World')
    console.log(req);

    res.json('Hello EXPRESS');

    /*    res.write('Hello EXPRESS 1\n');
        res.write('Hello EXPRESS 2\n');
        res.write('Hello EXPRESS 3\n');
        res.end('End');*/

    // res.status(404).json('Not found');
})

app.get('/out-users', async (req, res) => {
    console.log(req);

    const resp = await axios.get('https://jsonplaceholder.typicode.com/users');

    res.status(resp.status).json(resp.data);
});

app.get('/users', (req, res) => {
    /*    res.json([
            {name: 'Alina'},
            {name: 'Maksym'},
            {name: 'Maria'},
        ]);*/

    res.json(users);
});

//analog CREATE (post)
app.get('/users/:userName/create', (req, res) => {
    users.push({
        name: req.params.userName,
        age: Math.random()*100,
    });

    res.status(201).json('User was created');
});

app.get('/users/:userId', (req, res) => {
    console.log(req.params);

    const userIndex = +req.params.userId;
    console.log(userIndex);

    if (isNaN(userIndex) || userIndex < 0) {
        res.status(400).json('Please, enter valid ID');
        return;
    }

    const user = users[userIndex];

    if(!user) {
        res.status(404).json(`User with ID ${userIndex} is not found`);
        return;
    }

    res.json(user);
});


// app.listen(3000) //port 3000 - default React
app.listen(5000, () => {
    console.log('Server run on port 5000');
});


