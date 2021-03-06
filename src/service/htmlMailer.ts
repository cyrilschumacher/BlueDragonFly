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

"use strict";

import * as EmailTemplates from "email-templates";
import * as nodemailer from "nodemailer";
import transport from "../configuration/transport";

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
     * @constructor
     * @param (string)      _from               The recipient.
     * @param (string)      _templateDirectory  The template directory.
     * @param (Transporter) _transport          The transporter.
     */
    public constructor(private _from: string, private _templateDirectory: string, private _transport?: nodemailer.Transporter) {
        const EmailTemplate = EmailTemplates.EmailTemplate;
        this._emailTemplate = new EmailTemplate(this._templateDirectory);

        if (!this._transport) {
            this._transport = transport;
        }
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
            html: html,
            subject: subject,
            text: text,
            to: to
        };
    };

    /**
     * @summary Sends an e-mail.
     * @param {string}      to          The recipient.
     * @param {string}      subject     The subject.
     * @param {Object}      data        The data.
     * @param {Function}    callback    The callback.
     */
    public sendAsync = (to: string, subject: string, data: Object, callback: (error: any) => void): void => {
        this._emailTemplate.render(data, (error: any, results: any) => {
            if (!error) {
                const text = results.text || "";
                const html = results.html || "";
                const options = this._createMailOptions(to, subject, text, html);

                this._transport.sendMail(options, callback);
            } else {
                callback(error);
            }
        });
    };
}

export default HtmlMailerService;
