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

/// <reference path="../typings/tsd.d.ts"/>

import * as bodyParser from "body-parser";
import * as express from "express";
import * as helmet from "helmet";
import * as path from "path";
import nconf from "./configuration/nconf";

import expressValidator = require("express-validator");

/**
 * @summary Initializes module.
 * @param {express} app     The application.
 * @param {string}  path    The path.
 */
function initializeModule(app: express.Express, path: string): void {
    require(path).initialize(app);
}

/**
 * @summary Initializes many modules.
 * @param {express} app     The application.
 * @param {Array}   paths   The paths.
 */
function initializeModules(app: express.Express, paths: Array<string>): void {
    "use strict";

    for (let path of paths) {
        initializeModule(app, path);
    }
}

// Creates express application.
const app = express();

// Configures express application.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(helmet());

// Initializes handlers.
const handlersPaths = [
    "./configuration/handler/compression",
    "./configuration/handler/cors",
    "./configuration/handler/environment",
    "./configuration/handler/i18next",
    "./configuration/handler/timeout"
];
initializeModules(app, handlersPaths);

// Initializes settings.
const settingsPaths = ["./configuration/settings/view"];
initializeModules(app, settingsPaths);

// Initializes route and startup.
import route from "./configuration/application/route";
route(app);

import startup from "./configuration/application/startup";
startup(app);
