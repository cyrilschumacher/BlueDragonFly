var assert = require('chai').assert;
var nock = require('nock');
var request = require('supertest');
var reCaptchaService = require('../../dist/service/reCaptcha');

describe('ReCaptchaService', function() {
    // Global variables.
    var reCaptcha = new reCaptchaService();

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

    it('should return a success', function(done) {
        var response = 'test';
        reCaptcha.verify('test', function(callback) {
            assert.ok(callback, true);
            done();
        });
    });
});
