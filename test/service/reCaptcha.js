'use strict';

/* Dependencies */
var assert = require('chai').assert;
var nock = require('nock');
var request = require('supertest');
var ReCaptchaService = require('../../dist/service/reCaptcha');

describe('ReCaptchaService', function() {
    // Global variables.
    var reCaptcha = new ReCaptchaService.default();

    /**
     * @summary Runs before each test.
     */
    beforeEach(function() {
        nock('https://www.google.com/recaptcha/api/')
            .get('/siteverify?secret=&response=test')
            .reply(200, {
                success: true
            });

        nock('https://www.google.com/recaptcha/api/')
            .get('/siteverify?secret=&response=other')
            .reply(500);
    });

    it('should return a success', function(done) {
        var response = 'test';
        reCaptcha.verifyAsync(response, function(callback) {
            assert.ok(callback);
            done();
        });
    });

    it('should return a error', function(done) {
        var response = 'other';
        reCaptcha.verifyAsync(response, function(callback) {
            assert.notOk(callback);
            done();
        });
    });
});
