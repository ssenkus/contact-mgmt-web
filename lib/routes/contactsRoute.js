'use strict';
const log = require('../log.js');
const contactsRepo = require('../dataAccess/contactsRepository.js');
const Contact = require('../models/contact.js');


exports.configure = (app) => {
    app.get('/api/:v?/contacts', getContacts);
    app.post('/api/:v?/contacts', createContact);
};

function createContact(req, res, done) {
    let contact = new Contact(req.body);

    contactsRepo.create(contact, (err, result) => {
        if (err) return done(err);

        return res.json({
            result: result,
            success: true
        });
    });
}

function getContacts(req, res, done) {

    contactsRepo.getAllContacts((err, result) => {

        return res.json({
            contacts: result,
            success: true
        });
    });
}