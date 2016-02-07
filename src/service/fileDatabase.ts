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

import * as async from "async";

/**
 * @summary Service for send a HTML mail.
 * @class
 */
class FileDatabaseService {
    /**
     * @summary Constructor.
     * @param {string}  _databaseDir    The database directory.
     * @param {any}     _fileSystem     The file system.
     * @param {any}     _path           The path.
     */
    public constructor(private _databaseDir: string, private _fileSystem: any, private _path: any) {
    }

    /**
     * @summary Gets rows.
     * @param {string}      tableName The table name.
     * @param {Function}    callback  The callback.
     */
    public getRow = (tableName: string, id: string, callback: (err: any, row?: Object) => void): void => {
        const tablePath = this._path.join(this._databaseDir, tableName, id);
        const path = this._path.normalize(tablePath);

        this._fileSystem.readFile(path, callback);
    };

    /**
     * @summary Gets rows.
     * @param {string}      tableName The table name.
     * @param {Function}    callback  The callback.
     */
    public getRows = (tableName: string, callback: (err: any, rows?: Array<Object>) => void): void => {
        const tablePath = this._path.join(this._databaseDir, tableName);
        const path = this._path.normalize(tablePath);

        this._fileSystem.readdir(path, (error: NodeJS.ErrnoException, files: Array<string>) => {
            if (!error) {
                async.map(files, (file, asyncCallback) => {
                    const absoluteFile = this._path.join(path, file);
                    this._fileSystem.readFile(absoluteFile, "utf8", (err: any, data: string) => {
                        const result = JSON.parse(data);
                        asyncCallback(err, result);
                    });
                }, (asyncError, results) => {
                    callback(asyncError, results);
                });
            } else {
                callback(error);
            }
        });
    };
}

export default FileDatabaseService;
