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

///<reference path="../../typings/nodemailer/nodemailer.d.ts"/>

import nodemailer = require("nodemailer");
import smtpTransport = require("nodemailer-smtp-transport");

var settings = require("../settings");

/**
 * @summary Service for send a mail.
 * @class
 */
class MailSenderService {
    /**
     * @summary Transport.
     * @private
     * @type {Transport}
     */
    private _transport: nodemailer.Transporter;

    /**
     * @summary Constructor.
     * @constructor
     */
    public constructor() {
        const options = {
            ignoreTLS: true,
            port: settings.smtp.port
        };

        this._transport = nodemailer.createTransport(options);
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
            from: settings.smtp.auth.user,
            to: to,
            subject: subject,
            html: html,
            text: text
        };
    };

    /**
     * @summary Sends a e-mail.
     * @param {string}      to       The recipient.
     * @param {string}      subject  The subject.
     * @param {string}      text     The text message.
     * @param {Function}    html     The HTML message.
     * @param {Function}    callback The callback.
     */
    public send = (to: string, subject: string, text: string, callback: (error: any) => void, html?: string): void => {
        // Creates mail options and sends mail with defined transport object.
        const mailOptions = this._createMailOptions(to, subject, text, html);
        this._transport.sendMail(mailOptions, callback);
    };
}

export = MailSenderService;
