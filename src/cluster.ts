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

import * as cluster from "cluster";
import * as os from "os";

/**
 * @summary Raises when the worker is exited.
 * @param {Worker} worker The worker.
 * @param {number} code   The code.
 * @param {string} signal The signal.
 */
function onExit(worker: cluster.Worker, code: number, signal: string) {
    console.log("worker " + worker.process.pid + " died");
}

/**
 * @summary Raises when the worker is online.
 * @param {Worker} worker The worker.
 */
function onOnline(worker: cluster.Worker) {
    console.log("Worker " + worker.process.pid + " is online");
}

/**
 * @summary Creates application fork.
 */
function createFork() {
    const cpus = os.cpus();
    const numWorkers = cpus.length;

    console.log("Master cluster setting up " + numWorkers + " workers...");
    for (let i = 0; i < numWorkers; i++) {
        cluster.fork();
    }
}

if (cluster.isMaster) {
    createFork();
    cluster.on("exit", onExit);
    cluster.on("online", onOnline);
} else {
    require("./app.js");
}
