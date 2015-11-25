// Dependencies.
var assert = require('chai').assert;
var MailDev = require('maildev');
var nodemailer = require('nodemailer');
var request = require('supertest');
var HtmlMailerService = require('../../dist/service/htmlMailer');

// Global variables.
var htmlMailer = new HtmlMailerService(),
    maildev = new MailDev();

describe('HtmlMailerService', function() {
    /**
     * @summary Runs before all test.
     */
    before(function() {
        maildev.listen();
    });

    it('should send a email', function(done) {
        var transport = nodemailer.createTransport({
            port: 1025,
            ignoreTLS: true,
        });

        var htmlMailer = new HtmlMailerService(transport, 'admin@test.com', 'test/resources/template/mail/');
        htmlMailer.send('jean.dupond@test.com', 'Subject', {}, function(errors) {
            assert.isNull(errors);
            done();
        });
    });
});
