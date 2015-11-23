var request = require('supertest');
var assert = require('chai').assert;
var app = require('../../dist/app');

afterEach(function() {
    app.close();
});

describe('IndexController', function() {
    it('should return a default page', function(done) {
        request(app)
            .get('/')
            .expect(200, done);
    });

    it('should return not found error', function(done) {
        request(app)
            .get('/not/exists')
            .expect(404, function(err, res) {
                if (err) {
                    throw err;
                }

                assert.typeOf(res.body, 'Object');
                done();
            });
    });
});
