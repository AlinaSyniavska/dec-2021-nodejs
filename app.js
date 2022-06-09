const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('Hello World')
})

// app.listen(3000) //port 3000 - default React
app.listen(5000)


