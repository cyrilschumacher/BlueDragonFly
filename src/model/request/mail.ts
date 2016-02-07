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

/**
 * @summary Represents the request for send a e-mail
 * @class
 */
class MailRequestModel {
    /**
     * @summary Captcha response.
     * @type {string}
     */
    public captcha: string;

    /**
     * @summary E-mail address.
     * @type {string}
     */
    public emailAddress: string;

    /**
     * @summary Message.
     * @type {string}
     */
    public message: string;

    /**
     * @summary Complete name.
     * @type {string}
     */
    public name: string;

    /**
     * @summary Subject.
     * @type {string}
     */
    public subject: string;

    /**
     * @summary Constructor.
     * @constructor
     * @param {Request}   request   The HTTP request.
     */
    public constructor(request: express.Request) {
        this.captcha = request.body["g-recaptcha-response"];
        this.emailAddress = request.body.emailAddress;
        this.message = request.body.message;
        this.name = request.body.name;
        this.subject = request.body.subject;
    }
}

export default MailRequestModel;
