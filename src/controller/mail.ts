/* The MIT License (MIT)
 *
 * Copyright (c) 2016 Cyril Schumacher.fr
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

import * as express from "express";
import * as util from "util";

import bunyan from "../configuration/bunyan";
import nconf from "../configuration/nconf";
import transport from "../configuration/transport";

import MailModel from "../model/request/mail";
import HtmlMailerService from "../service/htmlMailer";
import ReCaptchaService from "../service/reCaptcha";

/**
 * @summary Controller for mail.
 * @class
 */
export default class MailController {
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
        const from = nconf.get("mail:from");
        const templateDir = nconf.get("mail:templateDir");

        this._htmlMailerService = new HtmlMailerService(transport, from, templateDir);
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

        request.checkBody("g-recaptcha-response", i18n.t("assert.mail.captcha.isEmpty")).notEmpty();
        request.checkBody("name", i18n.t("assert.mail.name.invalidLength")).optional().len(0, 70);
        request.checkBody("emailAddress", i18n.t("assert.mail.emailAddress.notValid")).isEmail();
        request.checkBody("subject", i18n.t("assert.mail.subject.isEmpty")).notEmpty();
        request.checkBody("subject", i18n.t("assert.mail.subject.invalidLength")).len(3, 255);
        request.checkBody("message", i18n.t("assert.mail.message.isEmpty")).notEmpty();
        request.checkBody("message", i18n.t("assert.mail.message.invalidLength")).len(1, 500);

        return request.validationErrors(true);
    };

    /**
     * @summary Sends e-mail.
     * @param {Request}   request   The HTTP request.
     * @param {Response}  response  The HTTP response.
     */
    public send = (request: express.Request, response: express.Response): void|express.Response => {
        let errors = this._assertMailInformation(request);
        if (errors) {
            const body = util.inspect(errors);
            return response.status(400).json(body);
        }

        const model = new MailModel(request);
        this._reCaptchaService.verifyAsync(model.captcha, (success: boolean): void|express.Response => {
            if (!success) {
                const body = util.inspect(errors);
                return response.status(400).json(body);
            }

            this._htmlMailerService.sendAsync(model.emailAddress, model.subject, model, sendErrors => {
                if (errors) {
                    bunyan.error(errors);

                    const body = util.inspect(sendErrors);
                    return response.status(500).json(body);
                }

                return response.end();
            });
        });
    };
}
