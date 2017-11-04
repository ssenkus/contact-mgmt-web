'use strict';
const db = require('./mongoClientWrapper.js');


exports.create = (contact, done) => {
    db.contacts().insertOne(contact, (err, result) => {
        if (err) return done(err);

        return done(null, result);
    });
};
