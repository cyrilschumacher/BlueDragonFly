'use strict';

/* Dependencies */
var assert = require('assert');
var nodemailer = require('nodemailer');
var nock = require('nock');
var request = require('supertest');
var stubTransport = require('nodemailer-stub-transport');

describe('MailController', function() {
    this.timeout(5000);

    // Global variables.
    var app, transport;

    /**
     * @summary Runs before all test.
     */
    before(function() {
        app = require('../../dist/app');
        transport = nodemailer.createTransport(stubTransport());
    });

    /**
     * @summary Runs after all test.
     */
    after(function() {
        app.close();
    });

    it('should return a error due to the absence of the fields "emailAddress"', function() {
    });

    it('should return a error due to the absence of the fields "g-recaptcha-response"', function() {
    });

    it('should send a email', function() {
    });
});
