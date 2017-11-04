'use strict';
const mongoClient = require('mongodb').MongoClient;
const config = require('../../config/config.js');
const log = require('../log.js');
let db;

exports.initialize = (done) => {

    if (db) return process.nextTick(done);

    log.info('Connecting to mongo database: ' + config.dbConnectionString);

    mongoClient.connect(config.dbConnectionString, (err, connectedDb) => {
        if (err) {
            log.error('Couldn\'t connect to mongo database', err);
            return done(err);
        }
        db = connectedDb;
        return done();
    });
};

exports.dispose = (done) => {
    if (db) {
        log.info('Closing connection to mongo database: ' + config.dbConnectionString);
        var tempDb = db;
        db = null;
        tempDb.close((err, result) => {
            if (err) {
                log.error('Error closing connection to mongo database', err);
                return done(err);
            }
            log.info('Database connection closed');
            return done();
        });
    } else {
        return process.nextTick(done);
    }
};

exports.getDb = () => {
    return db;
};

exports.contacts = () => {
    return db.collection('contacts');
};