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

import * as http from "http";
import * as https from "https";
import nconf from "../configuration/nconf";
import * as util from "util";

/**
 * @summary Service for Google ReCaptcha.
 * @class
 */
class ReCaptchaService {
    /**
     * @summary Verify if the response of captcha is correct.
     * @param {string}      response    The HTTP response.
     * @param {Function}    callback    The callback.
     */
    private _verify = (response: http.IncomingMessage, callback: (success: boolean) => void): void => {
        let data = "";
        response.on("data", function(chunk: any) {
            data += chunk.toString();
        });

        response.on("end", function() {
            try {
                const parsedData = JSON.parse(data);
                callback(parsedData.success);
            } catch (e) {
                callback(false);
            }
        });
    };

    /**
     * @summary Verify if the response of captcha is correct.
     * @param {string}      response    The captcha response.
     * @param {Function}    callback    The callback.
     */
    public verifyAsync = (response: string, callback: (success: boolean) => void): void => {
        const ORIGINAL_URL = "https://www.google.com/recaptcha/api/siteverify?secret=%s&response=%s";
        const secret = nconf.get("reCaptcha:secret");
        const URL = util.format(ORIGINAL_URL, secret, response);

        https.get(URL, res => this._verify(res, callback));
    };
}

export default ReCaptchaService;
