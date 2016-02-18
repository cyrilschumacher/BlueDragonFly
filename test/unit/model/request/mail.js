'use strict';

var assert = require('chai').assert;
var MailRequestModel = require("../../../../dist/model/request/mail");

describe('MailRequestModel', function() {
    it('should return skills section', function() {
        var request = {
            body: {
                "emailAddress": "test@test.com",
                "g-recaptcha-response": "test",
                "message": "This is my message.",
                "name": "Firstname Lastname",
                "subject": "Subject"
            }
        };

        var model = new MailRequestModel.default(request);
        assert.isObject(model);
        assert.equal(model.captcha, request.body["g-recaptcha-response"]);
        assert.equal(model.emailAddress, request.body.emailAddress);
        assert.equal(model.message, request.body.message);
        assert.equal(model.name, request.body.name);
        assert.equal(model.subject, request.body.subject);
    });
});
