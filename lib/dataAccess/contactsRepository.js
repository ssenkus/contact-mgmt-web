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
    let contactId = new ObjectID(contact._id);
    delete contact._id;

    db.contacts().updateOne({_id: contactId}, {$set: contact}, (err, result) => {
        return done(err, result);
    });

};

exports.deleteById = (contactId, done) => {
    let id = new ObjectID(contactId);
    db.contacts().deleteOne({_id: id}, (err, doc) => {
        if (err) return done(err);
        return done(null, doc);
    });
};
