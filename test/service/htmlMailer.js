/* Dependencies */
var assert = require('chai').assert;
var nodemailer = require('nodemailer');
var request = require('supertest');
var stubTransport = require('nodemailer-stub-transport');

var HtmlMailerService = require('../../dist/service/htmlMailer');

/* Global variables */
var htmlMailer = new HtmlMailerService.default();

describe('HtmlMailerService', function() {
    // Global variables.
    var transport;

    /**
     * @summary Runs before all test.
     */
    before(function() {
        transport = nodemailer.createTransport(stubTransport());
    });

    it('should send a email', function(done) {
        var from = 'admin@test.com';
        var templateDir = './test/resource/template/mail/';
        var htmlMailer = new HtmlMailerService.default(from, templateDir, transport);

        htmlMailer.sendAsync('jean.dupond@test.com', 'Subject', {}, function(errors) {
            assert.isNull(errors);
            done();
        });
    });

    it('should return a error', function(done) {
        var from = 'admin@test.com';
        var templateDir = 'path/not/exists/';
        var htmlMailer = new HtmlMailerService.default(from, templateDir, transport);

        htmlMailer.sendAsync('jean.dupond@test.com', 'Subject', {}, function(errors) {
            assert.isNotNull(errors);
            done();
        });
    });
});
