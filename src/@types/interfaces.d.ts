declare interface IData {
    /**
     * The data object that will be used to populate the template
     * @example
     * ```json
     * {
     *  "fieldName": "username",
     *  "required": true,
     * }
     * ```
     */
    rawData: SwaggerSchema.Spec;
    /**
     * The local path to the data object
     * @examples
     * - `swaggerdata/swagger.json`
     * - `C:\user\swagger.json`
     */
    path: CodegenPath;
}

declare interface ITemplate {
    /**
     * The [**Handlebars**](https://handlebarsjs.com) template that will be used to generate **APIs** and **Models**
     * @examples
     * - `"Welcome {{user}}"`
     * - ```handlebars
     * interface {{name}} {
     *      {{each vars}}{{name}}{{if required}}?{{/if}}:{{type}}{{/if}}
     * }
     * ```
     */
    rawData: string;
    /**
     * The local path to the [**Handlebars**](https://handlebarsjs.com) template
     * @examples
     * - `templates/template.handlebars`
     * - `C:\user\template.handlebars`
     */
    path: CodegenPath;
}

declare interface IOutputPaths {
    api: string;
    model: string;
}