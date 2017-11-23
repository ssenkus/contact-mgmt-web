'use strict';
const assert = require('chai').assert;
const Contact = require('../../../lib/models/contact.js');


describe('Contact tests', () => {

    it('should create a contact object', () => {

        let contact = new Contact({
            firstName: 'Test',
            lastName: 'Testerson',
            emailAddress: 'test@test.com'
        });

        assert.equal(contact.firstName, 'Test');
        assert.equal(contact.lastName, 'Testerson');
        assert.equal(contact.emailAddress, 'test@test.com');
    });


});
