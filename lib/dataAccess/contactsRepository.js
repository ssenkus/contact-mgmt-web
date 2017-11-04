'use strict';
const db = require('./mongoClientWrapper.js');
const ObjectID = require('mongodb').ObjectID;

exports.create = (contact, done) => {
    db.contacts().insertOne(contact, (err, result) => {
        if (err) return done(err);

        return done(null, result);
    });
};

exports.getAllContacts = (done) => {
    db.contacts().find().toArray((err, result) => {
        if (err) return done(err);

        return done(null, result);
    });
};

exports.getContactById = (contactId, done) => {
    db.contacts().find({_id: new ObjectID(contactId)}).toArray((err, result) => {
        if (err) return done(err);

        return done(null, result);
    });
};

exports.updateContact = (contact, done) => {
    db.contacts().update(
        {_id: new ObjectID(contact._id)},
        contact,
        (err) => {
            return done(err);
        }
    );
};

exports.deleteById = (contactId, done) => {
    let id = new ObjectID(contactId);
    db.contacts().deleteOne({_id: id}, (err, doc) => {
        if (err) return done(err);
        return done(null, doc);
    });
};
