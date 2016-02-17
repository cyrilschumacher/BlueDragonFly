'use strict';

var nconf = require('../../../dist/configuration/nconf');
var request = require('supertest');
var assert = require('chai').assert;

describe('ResumeController', function() {
    this.timeout(5000);

    // Global variables.
    var app;

    /**
     * @summary Runs before all test.
     */
    before(function() {
        nconf.default.file('./test/configuration.json');
        app = require('../../../dist/app');
    });

    /**
     * @summary Runs after all test.
     */
    after(function() {
        app.close();
    });

    it('should return education section', function(done) {
        var expected = [{'key1':'value1'}, {'key2': 'value2'}];
        request(app)
            .get('/resume/education')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(expected, done);
    });
});
