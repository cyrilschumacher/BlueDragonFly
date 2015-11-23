var request = require('supertest');
var assert = require('chai').assert;
var nock = require('nock');
var app = require('../../dist/app');

beforeEach(function() {
    nock('https://www.google.com/recaptcha/api/')
        .get('/siteverify?secret=&response=test')
        .reply(200, {
            success: true
        });
});

afterEach(function() {
    app.close();
});

describe('MailController', function() {
    this.timeout(10000);

    it('should send a email', function(done) {
        request(app)
            .post('/mail/send/')
            .type('form')
            .send('name=Jean+Dupond&emailAddress=jean.dupond%40test.com&message=Hello%2Cworld!&g-recaptcha-response=test&subject=This+is+a+test')
            .expect(200, function(err, res) {
                console.log(res.body);
                done();
            });
    });
});
