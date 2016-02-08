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

import * as express from "express";
import * as helmet from "helmet";
import * as bodyParser from "body-parser";
import nconf from "./configuration/nconf";

import expressValidator = require("express-validator");

"use strict";

// Creates express application.
const app = express();

// Configures express application.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(helmet());

// Initializes 'timeout' module.
import timeout = require("./configuration/handler/timeout");
timeout.initialize(app);

// Initializes 'compresion' module.
import compresion = require("./configuration/handler/compression");
compresion.initialize(app);

// Initializes environment.
import environment = require("./configuration/handler/environment");
environment.initialize(app);

// Initializes localization.
import i18next = require("./configuration/handler/i18next");
i18next.initialize(app);

// Initializes routes.
import route = require("./configuration/route");
route.initialize(app);

// Initializes startup.
import startup = require("./configuration/startup");
export = startup.initialize(app);
