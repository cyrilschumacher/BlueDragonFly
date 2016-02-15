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

import * as http from "http";
import * as https from "https";
import nconf from "../configuration/nconf";

type VerifyCallback = (success: boolean) => void;

/**
 * @summary Service for Google ReCaptcha.
 * @class
 */
class ReCaptchaService {
    /**
     * @summary Fires when there will be no more data to read.
     * @private
     * @param {string}   data        The data.
     * @param {Function} callback    The callback.
     */
    private _onEnded = (data: string, callback: VerifyCallback): void => {
        try {
            const parsedData = JSON.parse(data);
            callback(parsedData.success);
        } catch (e) {
            callback(false);
        }
    }

    /**
    * @summary Fires when data is available.
    * @private
    * @param {Buffer}   chunk   The chunk of data.
    * @param {string}   data    The data.
     *
     */
    private _onReaded = (chunk: Buffer, data: string): void => {
        data += chunk.toString();
    }

    /**
     * @summary Verify if the response of captcha is correct.
     * @private
     * @param {string}      response    The HTTP response.
     * @param {Function}    callback    The callback.
     */
    private _verify = (response: http.IncomingMessage, callback: VerifyCallback): void => {
        let data = "";

        response.on("data", (chunk: Buffer) => this._onReaded(chunk, data));
        response.on("end", () => this._onEnded(data, callback));
    };

    /**
     * @summary Verify if the response of captcha is correct.
     * @param {string}      response    The captcha response.
     * @param {Function}    callback    The callback.
     */
    public verifyAsync = (response: string, callback: VerifyCallback): void => {
        const secret = nconf.get("reCaptcha:secret");
        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${response}`;

        https.get(url, res => this._verify(res, callback));
    };
}

export default ReCaptchaService;
