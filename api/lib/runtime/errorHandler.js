var _ = require('underscore');
var log = require('../log.js');
var config = require('../../config/config.js');

exports.handler = function (err, req, res, next) {
    var response = {
        message: '',
        stack: ''
    };

    if (err.code && _.isNumber(err.code) && err.name !== 'MongoError') {
        // this is the case where a specific code and message should be returned
        res.statusCode = err.code;
        var logMessage = getErrorMessageForRequest(req) + ', code: ' + err.code;
        if (err.message) {
            response.message = err.message;
            logMessage += ', message: ' + err.message;
        }
        if (err.subStatus) {
            response.subStatus = err.subStatus;
            logMessage += ', subStatus: ' + err.subStatus;
        }
        log.debug(logMessage);
    } else {
        if (err.name && err.name === "UnauthorizedError") {
            res.statusCode = 401;
            response.message = "Missing or invalid auth token";
        } else {
            res.statusCode = 500;
            if (err.message) { response.message = err.message; }
        }
        log.warn(getErrorMessageForRequest(req), err);
        if (err.stack) {
            response.stack = err.stack;
        }
    }

    if (!config.testFeaturesEnabled) {
        response.stack = '';
    }

    var accept = req.headers.accept || '';

    if (accept.indexOf('json') > 0) {
        res.json(response);
    } else {
        var responseString = JSON.stringify(response, null, 4);
        res.setHeader('Content-Type', 'text/plain');
        res.end(responseString);
    }
};

function getErrorMessageForRequest(req) {
    var msg = "Error during request to " + req.url;
    if (req.user && req.user.email) {
        msg += " - " + req.user.email;
    } else if (req.authToken) {
        msg += " - userId: " + req.authToken.userId;
    }
    return msg;
}