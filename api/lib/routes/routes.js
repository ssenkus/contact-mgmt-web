const config = require('../../config/config.js');
const contactsRoute = require('./contactsRoute.js');

exports.configure = function (app) {

    // TODO: may not need this...
    app.options('*', function(req, res){
        res.status(200);
        res.send('');
    });

    app.get('/', function (req, res) {
        res.redirect('/app');
    });

    contactsRoute.configure(app);

    // 404 handler
    app.use(function (req, res, next) {
        res.status(404);
        res.type('txt');
        res.send('Unknown route');
    });
};

