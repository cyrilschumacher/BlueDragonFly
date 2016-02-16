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
import bunyan from "../bunyan";
import brute from "../brute";

import IndexController from "../../controller/index";
import MailController from "../../controller/mail";
import ResumeController from "../../controller/resume";
import WorksController from "../../controller/works";

/**
 * @summary Initializes routes.
 * @param {Express} app The express application.
 */
export default function initialize(app: express.Express) {
    bunyan.info("Initializes Express routes.");

    // Mail.
    const mailController = new MailController();
    app.post("/mail", brute, mailController.send);

    // Index.
    const indexController = new IndexController();
    app.get("/", indexController.default);

    // Resume.
    const resumeController = new ResumeController();
    app.get("/resume/education", resumeController.getEducationSection);
    app.get("/resume/experience", resumeController.getExperienceSection);

    // Works.
    const worksController = new WorksController();
    app.get("/works", worksController.getAll);

    // Error.
    app.use(indexController.notFound);
}
