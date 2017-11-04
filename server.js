var express = require('express')
var app = express()

app.get('/', function (req, res) {
    res.send('Hello Worlsdfsdfd')
})

app.listen(3000)