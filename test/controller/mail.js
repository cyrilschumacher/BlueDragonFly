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

    it('should return a error due to the absence of the fields "emailAddress"', function(done) {
        var body = 'name=Jean+Dupond&message=Hello%2Cworld!&g-recaptcha-response=test&subject=This+is+a+test';
        request(app)
            .post('/mail/send/')
            .type('form')
            .send(body)
            .expect(400, done);
    });

    it('should return a error due to the absence of the fields "g-recaptcha-response"', function(done) {
        var body = 'name=Jean+Dupond&emailAddress=jean.dupond@test.com&message=Hello%2Cworld!&subject=This+is+a+test';
        request(app)
            .post('/mail/send/')
            .type('form')
            .send(body)
            .expect(400, done);
    });

    it('should send a email', function(done) {
        var body = 'name=Jean+Dupond&emailAddress=jean.dupond@test.com&message=Hello%2Cworld!&g-recaptcha-response=test&subject=This+is+a+test';
        request(app)
            .post('/mail/send/')
            .type('form')
            .send(body)
            .expect(200, done);
    });
});
