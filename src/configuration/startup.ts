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
import * as fs from "fs";
import * as http2 from "http2";
import bunyan from "./bunyan";
import nconf from "./nconf";

/**
 * @summary Sets the UID.
 */
function _setUID() {
    if (process.setuid) {
        const uid = <number> nconf.get("express:uid");
        if (uid) {
            process.setuid(uid);
            bunyan.info(`Server's UID is now ${process.getuid() }.`);
        }
    }
}

/**
 * @summary Initializes the express startup.
 * @param {Express} app The express application.
 */
export function initialize(app: express.Express) {
    const port = <number> nconf.get("server:listen");

    return app.listen(port, () => {
         bunyan.info(`Started Express server listening on port ${port} in ${app.settings.env} mode.`);
         _setUID();
    });
}
