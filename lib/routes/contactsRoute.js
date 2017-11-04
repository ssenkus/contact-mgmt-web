'use strict';
const _ = require('underscore');
const log = require('../log.js');
const moment = require('moment');
// const validation = require('../validation.js');
//const util = require('../util.js');
const contactsRepo = require('../dataAccess/contactsRepository.js');
const config = require('../../config/config.js');


exports.configure = (app) => {
    app.get('/api/:v?/contacts', getContacts);
    app.post('/api/:v?/contacts', createContact);
};

function createContact(req, res, done) {

    contactsRepo.create({}, (err, result) => {
        if (err) return done(err);

        return res.json({
            result: result,
            success: true
        });
    });


}

function getContacts(req, res, done) {
    return res.json({
        success: true
    });
}