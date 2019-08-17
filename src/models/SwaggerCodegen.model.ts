import { SwaggerSchema } from "@typings/swagger-schema.type";

export namespace NSSwaggerCodegen {
    export namespace NSInterfaces {
        export interface IData {
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
            rawData: SwaggerSchema.SwaggerSpec;
            /**
             * The local path to the data object
             * @examples
             * - `swaggerdata/swagger.json`
             * - `C:\user\swagger.json`
             */
            path: Path;
        }

        export interface ITemplate {
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
            path: Path;
        }

        export interface IOutputPaths {
            api: string;
            model: string;
        }

        export type Path = {
            uri: string;
            type: any;
        };
        
        export type ConstructorOptions = {
            /**
             * The [**Handlebars**](https://handlebarsjs.com) template that will be used to generate **APIs** and **Models**
             */
            template: string;
            /**
             * The data to be used to populate the template
             */
            data: string | SwaggerSchema.SwaggerSpec;
            /**
             * The output path of the generated files
             */
            output: string | IOutputPaths;
        };
    }

    export namespace NSEnums {
        export enum ValueTypes {
            URL = "URL",
            PATH = "PATH",
            TEMPLATE = "TEMPLATE",
            SCHEMA = "SCHEMA",
            OUTPUT_PATHS = "OUTPUT_PATHS",
            UNKNOWN = "UNKNOWN"
        }

        export enum SourceTypes {
            EXTERNAL = "EXTERNAL",
            LOCAL = "LOCAL",
            RAW = "RAW",
            UNKNOWN = "UNKNOWN"
        }
    }

    export class Data implements NSInterfaces.IData {
        public rawData: SwaggerSchema.SwaggerSpec;
        public path: NSInterfaces.Path;

        constructor(obj?: NSInterfaces.IData) {
            return obj ? this.set("rawData", obj.rawData).set("path", obj.path) : this.init();
        }

        public set(key: keyof Data, value: any): Data {
            if (key) { this[key] = value; }
            return this;
        }

        private init(): Data {
            return this.set("rawData", null).set("path", { uri: "", type: NSEnums.SourceTypes.UNKNOWN });
        }
    }

    export class Template implements NSInterfaces.ITemplate {
        public rawData: string;
        public path: NSInterfaces.Path;

        constructor(obj?: NSInterfaces.ITemplate) {
            return obj ? this.set("rawData", obj.rawData).set("path", obj.path) : this.init();
        }

        public set(key: keyof Template, value: any): Template {
            if (key) { this[key] = value; }
            return this;
        }

        private init(): Template {
            return this.set("rawData", null).set("path", { uri: "", type: NSEnums.SourceTypes.UNKNOWN });
        }
    }

    export class OutputPaths implements NSInterfaces.IOutputPaths {
        public api: string;
        public model: string;

        constructor(obj?: string | OutputPaths) {
            if (obj) {
                if (typeof obj === "string") {
                    return this.setBoth(obj);
                } else if (typeof obj === "object") {
                    return this.set("api", obj.api).set("model", obj.model);
                }
            }
            return this.init();
        }

        public set(key: keyof OutputPaths, value: string): OutputPaths {
            if (key) { this[key] = <any>value; }
            return this;
        }

        public setBoth(value: string): OutputPaths {
            this.set("api", value).set("model", value);
            return this;
        }

        private init(): OutputPaths {
            return this.set("api", "").set("model", "");
        }
    }
}
