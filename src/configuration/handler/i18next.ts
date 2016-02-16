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
import * as i18next from "i18next";
import * as i18nextMiddleware from "i18next-express-middleware";
import * as FilesystemBackend from "i18next-node-fs-backend";
import * as sprintf from "i18next-sprintf-postprocessor";

import bunyan from "../bunyan";
import nconf from "../nconf";

/**
 * @summary Initializes "i18next" handler.
 * @param {Express} app The express application.
 */
export function initialize(app: express.Express) {
    bunyan.info("Initializes 'i18next' handler.");

    const options = nconf.get("handler:i18next");
    i18next.use(i18nextMiddleware.LanguageDetector)
        .use(FilesystemBackend)
        .use(sprintf)
        .init(options);

    app.use(i18nextMiddleware.handle(i18next));
}
