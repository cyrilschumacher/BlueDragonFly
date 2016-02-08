/* Dependencies */
var assert = require('chai').assert;
var MailDev = require('maildev');
var nodemailer = require('nodemailer');
var request = require('supertest');
var HtmlMailerService = require('../../dist/service/htmlMailer');

/* Global variables */
var htmlMailer = new HtmlMailerService.default(),
    maildev = new MailDev(),
    transport;

describe('HtmlMailerService', function() {
    /**
     * @summary Runs before all test.
     */
    before(function() {
        maildev.listen();
        transport = nodemailer.createTransport({
            port: 1025,
            ignoreTLS: true,
        });
    });

    it('should send a email', function(done) {
        var from = 'admin@test.com';
        var templateDir = 'test/resources/template/mail/';
        var htmlMailer = new HtmlMailerService(transport, from, templateDir);

        htmlMailer.sendAsync('jean.dupond@test.com', 'Subject', {}, function(errors) {
            assert.isNull(errors);
            done();
        });
    });

    it('should return a error', function(done) {
        var from = 'admin@test.com';
        var templateDir = 'path/not/exists/';
        var htmlMailer = new HtmlMailerService(transport, from, templateDir);

        htmlMailer.sendAsync('jean.dupond@test.com', 'Subject', {}, function(errors) {
            assert.isNotNull(errors);
            done();
        });
    });
});
