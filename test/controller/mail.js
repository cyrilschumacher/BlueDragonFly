'use strict';

/* Dependencies */
var app = require('../../dist/app');
var assert = require('assert');
var MailDev = require('maildev');
var nock = require('nock');
var request = require('supertest');

describe('MailController', function() {
    this.timeout(5000);

    // Global variables.
    var maildev = new MailDev();

    /**
     * @summary Runs before all test.
     */
    before(function() {
        maildev.listen();
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
     * @summary Runs after each test.
     */
    afterEach(function() {
        app.close();
    });

    it('should return a error', function(done) {
        request(app)
            .post('/mail/send/')
            .type('form')
            .send('name=Jean+Dupondtest.com&message=Hello%2Cworld!&g-recaptcha-response=test&subject=This+is+a+test')
            .expect(400, done);
    });

    it('should send a email', function(done) {
        request(app)
            .post('/mail/send/')
            .type('form')
            .send('name=Jean+Dupond&emailAddress=jean.dupond@test.com&message=Hello%2Cworld!&g-recaptcha-response=test&subject=This+is+a+test')
            .expect(200, done);
    });
});
