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

"use strict";

import * as express from "express";
import ErrorResponseModel from "../model/response/error";

/**
 * @summary Controller for index.
 * @class
 */
class IndexController {
    /**
     * @summary Default page.
     * @param request   The HTTP request.
     * @param response  The HTTP response.
     */
    public default(request: express.Request, response: express.Response): void {
        response.render("index");
    };

    /**
     * @summary Not found page.
     * @param {Request}     request   The HTTP request.
     * @param {Response}    response  The HTTP response.
     */
    public notFound(request: express.Request, response: express.Response): void {
        const i18n = request.i18n;
        const model = new ErrorResponseModel(i18n.t("error.notFound"));
        response.status(404).json(model);
    };
}

export default IndexController;
