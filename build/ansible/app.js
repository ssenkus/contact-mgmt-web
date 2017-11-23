var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    routes = require('./server/routes/routes.js'),
    socketHandler = require('./server/socket/socketHandler');

var app = express(),
    server = http.Server(app);


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(express.static('public'));

routes(app);
socketHandler.register(server);


server.listen(3000, function () {
    var port = server.address().port;
    console.log('AnsibleApp listening at http://%s:%s', 'localhost', port);
});