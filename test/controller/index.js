'use strict';

var nconf = require('../../dist/configuration/nconf');
var request = require('supertest');

describe('IndexController', function() {
    this.timeout(5000);

    // Global variables.
    var app;

    /**
     * @summary Runs before all test.
     */
    before(function() {
        nconf.default.set('settings:view:path', './test/resource/view');
        app = require('../../dist/app');
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
            .expect(200, done);
    });

    it('should return not found error', function(done) {
        request(app)
            .get('/not/exists')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
});
