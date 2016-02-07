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
import * as ExpressBrute from "express-brute";
import * as MemcachedStore from "express-brute-memcached";

import bunyan from "../bunyan";
import nconf from "../nconf";

/**
 * @summary Gets the ExpressBrute store.
 * @return {MemoryStore|MemcachedStore} The store.
 */
function _getExpressBruteStore() {
    if (process.env.NODE_ENV === "production") {
        bunyan.info("Using MemcachedStore for brute-force protection middleware.");

        const hosts = nconf.get("memcachedstore:host");
        return new MemcachedStore(hosts);
    }

    bunyan.info("Using in-memory store for brute-force protection middleware.");
    return new ExpressBrute.MemoryStore();
}

/**
 * @summary Initializes environment.
 * @param {Express} app The express application.
 */
export function initialize(app: express.Express) {
    bunyan.info("Initializes brute-force protection middleware.");

    const store = _getExpressBruteStore();
    const options = nconf.get("expressBrute:options");
    const brute = new ExpressBrute(store, options);
    app.use(brute.prevent);
}
