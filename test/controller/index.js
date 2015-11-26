'use strict';

/* Dependencies */
var app = require('../../dist/app');
var request = require('supertest');

describe('IndexController', function() {
    /**
     * @summary Runs after all tests.
     */
    afterEach(function() {
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
