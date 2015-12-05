/// <reference path="../typings/node/node.d.ts"/>

import cluster = require("cluster");
import os = require("os");

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
