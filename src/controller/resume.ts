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
import * as util from "util";
import * as path from "path";

import nconf from "../configuration/nconf";
import FileDatabaseService from "../service/fileDatabase";

/**
 * @summary Controller for mail.
 * @class
 */
export default class ResumeController {
    /**
     * @summary Service for manage File database.
     * @type {FileDatabaseService}
     */
    private _fileDatabaseService: FileDatabaseService;

    /**
     * @summary Constructor.
     * @constructor
     */
    public constructor() {
        const databaseDir = <string> nconf.get("resume:path");
        this._fileDatabaseService = new FileDatabaseService(databaseDir, fs, path);
    }

    /**
     * @summary Gets the education section.
     * @param {Request}   request   The HTTP request.
     * @param {Response}  response  The HTTP response.
     */
    public getEducationSection = (request: express.Request, response: express.Response): void => {
        this._fileDatabaseService.getRows("education", (error, files) => {
            if (error) {
                const body = util.inspect(error);
                response.status(500).json(body);
            } else {
                response.json(files);
            }
        });
    };

    /**
     * @summary Gets the experience section.
     * @param {Request}   request   The HTTP request.
     * @param {Response}  response  The HTTP response.
     */
    public getExperienceSection = (request: express.Request, response: express.Response): void => {
        this._fileDatabaseService.getRows("experience", (error, files) => {
            if (error) {
                const body = util.inspect(error);
                response.status(500).json(body);
            } else {
                response.json(files);
            }
        });
    };
}
