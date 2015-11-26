'use strict';

/* Dependencies */
var app = require('../../dist/app');
var request = require('supertest');
var assert = require('chai').assert;

describe('ResumeController', function() {
    /**
     * @summary Runs after all tests.
     */
    afterEach(function() {
        app.close();
    });

    it('should return education section', function(done) {
        request(app)
            .get('/resume/education')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
