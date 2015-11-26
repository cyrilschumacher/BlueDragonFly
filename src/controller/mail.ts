/* The MIT License (MIT)
 *
 * Copyright (c) 2015 Cyril Schumacher.fr
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

///<reference path="../../typings/i18next/i18next.d.ts"/>

import express = require("express");
import logger = require("../configuration/bunyan");
import util = require("util");
import transport = require("../configuration/transport");

import MailModel = require("../model/request/mail");
import HtmlMailerService = require("../service/htmlMailer");
import ReCaptchaService = require("../service/reCaptcha");

var settings = require("../settings");

/**
 * @summary Controller for mail.
 * @class
 */
class MailController {
    /**
     * @summary HTML mailer service.
     * @type {HtmlMailerService}
     */
    private _htmlMailerService: HtmlMailerService;

    /**
     * @summary ReCaptcha service.
     * @type {ReCaptchaService}
     */
    private _reCaptchaService: ReCaptchaService;

    /**
     * @summary Constructor.
     * @constructor
     */
    public constructor() {
        this._htmlMailerService = new HtmlMailerService(transport, settings.mail.from, settings.mail.templateDir);
        this._reCaptchaService = new ReCaptchaService();
    }

    /**
     * @summary Asserts that the mail information is valid.
     * @private
     * @param   {Request}   request   The HTTP request.
     * @return  {any}                 The errors encountered.
     */
    private _assertMailInformation = (request: express.Request): any => {
        const i18n = request["i18n"];

        // Captcha.
        request.checkBody("g-recaptcha-response", i18n.t("assert.mail.captcha.isEmpty")).notEmpty();

        // Complete name.
        request.checkBody("name", i18n.t("assert.mail.name.invalidLength")).optional().len(0, 70);

        // E-mail address.
        request.checkBody("emailAddress", i18n.t("assert.mail.emailAddress.notValid")).isEmail();

        // Subject.
        request.checkBody("subject", i18n.t("assert.mail.subject.isEmpty")).notEmpty();
        request.checkBody("subject", i18n.t("assert.mail.subject.invalidLength")).len(3, 255);

        // Message.
        request.checkBody("message", i18n.t("assert.mail.message.isEmpty")).notEmpty();
        request.checkBody("message", i18n.t("assert.mail.message.invalidLength")).len(1, 500);

        return request.validationErrors(true);
    };

    /**
     * @summary Sends e-mail.
     * @param {Request}   request   The HTTP request.
     * @param {Response}  response  The HTTP response.
     */
    public send = (request: express.Request, response: express.Response): void => {
        var errors = this._assertMailInformation(request);
        if (!errors) {
            var model = new MailModel(request);
            this._reCaptchaService.verify(model.captcha, (success: boolean) => {
                if (success) {
                    this._htmlMailerService.send(model.emailAddress, model.subject, model, (errors: any) => {
                        if (!errors) {
                            response.end();
                        } else {
                            logger.error(errors);
                            response.status(500).json(util.inspect(errors));
                        }
                    });
                } else {
                    response.status(400).json(util.inspect(errors));
                }
            });
        } else {
            response.status(400).json(util.inspect(errors));
        }
    };
}

export = MailController;
