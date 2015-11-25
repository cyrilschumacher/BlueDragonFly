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

///<reference path="../typing/email-templates/email-templates.d.ts"/>
///<reference path="../../typings/nodemailer/nodemailer.d.ts"/>

import EmailTemplates = require("email-templates");
import nodemailer = require("nodemailer");

var settings = require("../settings");

/**
 * @summary Service for send a HTML mail.
 * @class
 */
class HtmlMailerService {
    /**
     * @summary Email template.
     * @type {EmailTemplate}
     */
    private _emailTemplate: EmailTemplates.EmailTemplate;

    /**
     * @summary Constructor.
     * @param (Transporter) _transporter        The transporter.
     * @param (string)      _from               The recipient.
     * @param (string)      templateDirectory   The template directory.
     */
    public constructor(private _transporter: nodemailer.Transporter, private _from: string, templateDirectory: string) {
        const EmailTemplate = EmailTemplates.EmailTemplate;
        this._emailTemplate = new EmailTemplate(templateDirectory);
    }

    /**
     * @summary Creates a mail options.
     * @private
     * @param   {string} to         The recipient.
     * @param   {string} subject    The subject.
     * @param   {string} message    The message.
     * @return  {SendMailOptions}   The mail options.
     */
    private _createMailOptions = (to: string, subject: string, text: string, html?: string): nodemailer.SendMailOptions => {
        return {
            from: this._from,
            to: to,
            subject: subject,
            html: html,
            text: text
        };
    };

    public send = (to: string, subject: string, data: Object, callback: (error: any) => void): void => {
        this._emailTemplate.render(data, (error: any, results: any) => {
            if (!error) {
                const text = results.text || "";
                const html = results.html || "";
                const options = this._createMailOptions(to, subject, text, html);

                this._transporter.sendMail(options, callback);
            } else {
                callback(error);
            }
        });
    };
}

export = HtmlMailerService;
