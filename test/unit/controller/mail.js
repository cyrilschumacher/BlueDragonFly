'use strict';

/* Dependencies */
var assert = require('assert');
var nodemailer = require('nodemailer');
var nconf = require('../../../dist/configuration/nconf');
var nock = require('nock');
var request = require('supertest');

describe('MailController', function() {
    // Global variables.
    var app;

    /**
     * @summary Runs before all test.
     */
    before(function() {
        nconf.default.file('./test/configuration.json');
        app = require('../../../dist/app');
    });

    /**
     * @summary Runs before each test.
     */
    beforeEach(function() {
        nock('https://www.google.com/recaptcha/api/')
            .get('/siteverify?secret=&response=test')
            .reply(200, {
                success: true
            });
    });

    /**
     * @summary Runs after all test.
     */
    after(function() {
        app.close();
    });

    it('should return a error due to the absence of the fields "emailAddress"', function(done) {
        var body = 'g-recaptcha-response=test&subject=Test&message=Test&name=John Doo';
        request(app)
            .post('/mail')
            .type('form')
            .send(body)
            .expect(400, done);
    });

    it('should return a error due to the absence of the fields "g-recaptcha-response"', function(done) {
        var body = 'emailAddress=test@test.fr&subject=Test&message=Test&name=John Doo';
        request(app)
            .post('/mail')
            .type('form')
            .send(body)
            .expect(400, done);
    });
});
