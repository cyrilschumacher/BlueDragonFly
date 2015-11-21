// Type definitions for node-email-templates
// Project: https://github.com/niftylettuce/node-email-templates
// Definitions by: Cyril Schumacher <https://github.com/cyrilschumacher>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

interface EmailTemplateResult {
    /**
     * @summary HTML result.
     * @type {string}
     */
    html: string;

    /**
     * @summary Text result.
     * @type {string}
     */
    text: string;
}

interface EmailTemplateCallback {
    /**
     * @summary Callback signature.
     */
    (err: Object, results: EmailTemplateResult): void;
}

declare module "email-templates" {
    export class EmailTemplate {
        /**
         * @summary Constructor.
         * @param {string} templateDir The template directory.
         */
        constructor(templateDir: string);

        /**
         * @summary Render a single template.
         * @param {EmailTemplateCallback|Object} locals The variables or callback function.
         * @param {EmailTemplateCallback} callback The callback function.
         */
        render(locals: EmailTemplateCallback|Object, callback?: EmailTemplateCallback): void;
    }
}
