var config = require('../../config/config.js');
var log = require('./../log.js');
var db = require('./../dataAccess/mongoClientWrapper.js');
var server = null;

exports.start = function () {
    log.info('Starting web process');
    initialize(function (err) {
        if (err) {
            log.error('Failed to initialize web process', err);
            shutDown();
            return;
        }

        try {
            startServer();
        } catch (err) {
            log.error('Exception encountered while trying to start server', err);
            shutDown();
            return;
        }
    });
};

function initialize(done) {
    // anything that needs to be setup before the process starts goes here
    log.info('Initializing web process');
    db.initialize(done);
}

function startServer() {
    var express = require('express');
    var favicon = require('serve-favicon');
    var bodyParser = require('body-parser');
    // var errorHandler = require('./errorHandler.js');
    var routes = require('../routes/routes.js');

    var app = express();

    var appFolder = __dirname + '/../..' + config.appRoot;
    app.use('/app', express.static(appFolder, {
        index: 'index.html'
    }));
//    app.use(favicon(appFolder + '/images/favicon.ico'));
//    app.use(requestDomain);
    app.use(bodyParser.json({limit: '5mb'}));
    routes.configure(app);
 //   app.use(errorHandler.handler);

    server = app.listen(config.port, function () {
        log.info('Express server listening on port ' + config.port);
    });
    hookUpEvents();
 //   socketMonitor.start(server);
}

function hookUpEvents() {
    process.on('exit', function () {
        log.info('Process exit event received for web process');
    });

    server.on('close', function () {
        // callback when all connections to the server are closed
        log.info('Server closed event received');
        db.dispose(function (err) {
            disconnectProcess();
        });
    });

    process.on('message', function(msg) {
        if (msg == 'shutdown') {
            shutDown();
        }
    });

    process.on('SIGINT', function () {
        if (config.useCluster){
            log.info('Process SIGINT event received for web process, doing nothing');
        } else {
            log.info('Process SIGINT event received for web process not using cluster, shutting down');
            shutDown();
        }
    });

    process.on('SIGTERM', function () {
        if (config.useCluster){
            log.info('Process SIGTERM event received for web process, doing nothing');
        } else {
            log.info('Process SIGTERM event received for web process not using cluster, shutting down');
            shutDown();
        }
    });
}

function shutDown() {
    log.warn('Shutting down web process');
    config.stopWatchingFileChanges();
    var killTimer = setTimeout(function () {
        log.error('Shut down of web process took too long, forcing exit');
        process.exit(1);
    }, config.killTimeoutMs);
    killTimer.unref();

    if (server) {
        server.close(); // stops accepting new connections
        socketMonitor.closeAllIdle(); // close existing connections
    } else {
        disconnectProcess();
    }
}

function disconnectProcess() {
    if (config.useCluster) {
        log.info('Disconnecting web process');
        cluster.worker.disconnect();
    }
}

function requestDomain(req, res, next) {
    var d = domain.create();
    d.on('error', function (err) {
        log.error('Unhandled error within a domain', err);
        try {
            shutDown();
            next(err);
        } catch (err2) {
            log.error('Encountered an unhandled error in the domain, and were unable to invoke the expected error handler', err2);
        }
    });
    d.add(req);
    d.add(res);
    d.run(next);
}
