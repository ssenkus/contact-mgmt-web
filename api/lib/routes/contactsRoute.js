'use strict';
const log = require('../log.js');
const contactsRepo = require('../dataAccess/contactsRepository.js');
const Contact = require('../models/contact.js');


exports.configure = (app) => {
    app.post('/api/:v?/contacts', createContact);
    app.get('/api/:v?/contacts', getContacts);
    app.get('/api/:v?/contacts/generate', generateContacts);
    app.get('/api/:v?/contacts/:id', getContactById);
    app.put('/api/:v?/contacts/:id', updateContact);
    app.delete('/api/:v?/contacts/:id', deleteById);

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
        if (err) return done(err);

        return res.json({
            contacts: result,
            success: true
        });
    });
}

function getContactById(req, res, done) {
    contactsRepo.getContactById(req.params.id, (err, contact) => {
        if (err) return done(err);
        return res.json({
            contact: contact
        });
    });

}

function updateContact(req, res, done) {
    let contact = req.body;

    contactsRepo.updateContact(contact, (err, result) => {
        if (err) return done(err);
        return res.json({result: result});
    });
}

function deleteById(req, res, done) {
    contactsRepo.deleteById(req.params.id, (err, result) => {
        return res.json({
            result: result,
            success: true
        });
    });
}

function generateContacts(req, res, done) {
    contactsRepo.generateFakeContacts(() => {
        return res.json({
            success: true
        });
    });
}