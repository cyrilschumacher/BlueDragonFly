'use strict';

var nconf = require('../../../dist/configuration/nconf');
var request = require('supertest');
var assert = require('chai').assert;

describe('ResumeController', function() {
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

    it('should an error for education section', function(done) {
        nconf.default.set('resume:table:education', '/foo');

        request(app)
            .get('/resume/education')
            .expect('Content-Type', /json/)
            .expect(500, done);
    });

    it('should return experience section', function(done) {
        var expected = [{'key1':'value1'}, {'key2': 'value2'}];
        request(app)
            .get('/resume/experience')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(expected, done);
    });

    it('should an error for experience section', function(done) {
        nconf.default.set('resume:table:experience', '/foo');

        request(app)
            .get('/resume/experience')
            .expect('Content-Type', /json/)
            .expect(500, done);
    });

    it('should return skills section', function(done) {
        var expected = [{'key1':'value1'}, {'key2': 'value2'}];
        request(app)
            .get('/resume/skills')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(expected, done);
    });

    it('should an error for skills section', function(done) {
        nconf.default.set('resume:table:skills', '/foo');

        request(app)
            .get('/resume/skills')
            .expect('Content-Type', /json/)
            .expect(500, done);
    });
});
