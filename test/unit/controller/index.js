'use strict';

var nconf = require('../../../dist/configuration/nconf');
var request = require('supertest');

describe('IndexController', function() {
    // Global variables.
    var app;

    /**
     * @summary Runs before all test.
     */
    before(function() {
        nconf.default.file('./test/configuration.json');
        app = require('../../..//dist/app');
    });

    /**
     * @summary Runs after all test.
     */
    after(function() {
        app.close();
    });

    it('should return a default page', function(done) {
        request(app)
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });

    it('should return not found error', function(done) {
        request(app)
            .get('/not/exists')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
});
