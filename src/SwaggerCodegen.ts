import Handlebars from "handlebars";
// import fs from "fs";
// import { get, IncomingMessage } from "http";
import _ from "lodash";
import { URL_REGEX, PATH_REGEX, URL_TO_JSON_REGEX, PATH_TO_JSON_REGEX, URL_TO_HANDLEBARS_REGEX, PATH_TO_HANDLEBARS_REGEX, HANDLEBARS_TEMPLATE_REGEX } from "./constants/regex.constant";
import { NSSwaggerCodegen } from "./models/SwaggerCodegen.model";
import { SwaggerSchema } from "@typings/swagger-schema.type";

export class SwaggerCodegen {
    private _data: NSSwaggerCodegen.Data = new NSSwaggerCodegen.Data();
    private _template: NSSwaggerCodegen.Template = new NSSwaggerCodegen.Template();
    private _outputDir: NSSwaggerCodegen.OutputPaths = new NSSwaggerCodegen.OutputPaths().setBoth(process.cwd());
    private _loadedTemplate: Handlebars.TemplateDelegate<any>;

    constructor(options?: NSSwaggerCodegen.NSInterfaces.ConstructorOptions) {
        if (options && typeof options === "object") {
            this.setData(options.data);
            this.setTemplate(options.template);
            this.setOutputDir(<string | NSSwaggerCodegen.OutputPaths>options.output);
        }
    }

    private findValueType(value: string | SwaggerSchema.SwaggerSpec | NSSwaggerCodegen.OutputPaths, ext?: "json" | "handlebars"): NSSwaggerCodegen.NSEnums.ValueTypes {
        let _PATH_REGEX: RegExp = PATH_REGEX;
        let _URL_REGEX: RegExp = URL_REGEX;
        if (value) {
            if (ext) {
                switch (ext) {
                    case "json": _PATH_REGEX = PATH_TO_JSON_REGEX; _URL_REGEX = URL_TO_JSON_REGEX; break;
                    case "handlebars": _PATH_REGEX = PATH_TO_HANDLEBARS_REGEX; _URL_REGEX = URL_TO_HANDLEBARS_REGEX; break;
                }
            }
            if (typeof value === "string") {
                if (_URL_REGEX.test(value)) {
                    return NSSwaggerCodegen.NSEnums.ValueTypes.URL;
                } else if (_PATH_REGEX.test(value)) {
                    return NSSwaggerCodegen.NSEnums.ValueTypes.PATH;
                } else if (HANDLEBARS_TEMPLATE_REGEX.test(value)) {
                    return NSSwaggerCodegen.NSEnums.ValueTypes.TEMPLATE;
                }
            } else if (typeof value === "object") {
                if (value.hasOwnProperty("api") && value.hasOwnProperty("model")) {
                    return NSSwaggerCodegen.NSEnums.ValueTypes.OUTPUT_PATHS;
                } else {
                    return NSSwaggerCodegen.NSEnums.ValueTypes.SCHEMA;
                }
            }
        }
        return NSSwaggerCodegen.NSEnums.ValueTypes.UNKNOWN;
    }

    public setData(value: string | SwaggerSchema.SwaggerSpec): boolean {
        const result = this.findValueType(value, "json");
        switch (result) {
            case NSSwaggerCodegen.NSEnums.ValueTypes.PATH: this._data.set("path", { uri: <string>value, type: NSSwaggerCodegen.NSEnums.SourceTypes.LOCAL }); return true;
            case NSSwaggerCodegen.NSEnums.ValueTypes.URL: this._data.set("path", { uri: <string>value, type: NSSwaggerCodegen.NSEnums.SourceTypes.EXTERNAL }); return true;
            case NSSwaggerCodegen.NSEnums.ValueTypes.SCHEMA:
                this._data.set("rawData", <SwaggerSchema.SwaggerSpec>value);
                if (this._data.path.type === NSSwaggerCodegen.NSEnums.SourceTypes.UNKNOWN) {
                    this._data.set("path", { ...this._data.path, type: NSSwaggerCodegen.NSEnums.SourceTypes.RAW });
                }
                return true;
            default: return false;
        }
    }

    public setTemplate(value: string): boolean {
        const result = this.findValueType(value, "handlebars");
        switch (result) {
            case NSSwaggerCodegen.NSEnums.ValueTypes.PATH: this._template.set("path", { uri: value, type: NSSwaggerCodegen.NSEnums.SourceTypes.LOCAL }); return true;
            case NSSwaggerCodegen.NSEnums.ValueTypes.URL: this._template.set("path", { uri: value, type: NSSwaggerCodegen.NSEnums.SourceTypes.EXTERNAL }); return true;
            case NSSwaggerCodegen.NSEnums.ValueTypes.TEMPLATE:
                this._template.set("rawData", value);
                if (this._template.path.type === NSSwaggerCodegen.NSEnums.SourceTypes.UNKNOWN) {
                    this._template.set("path", { ...this._template.path, type: NSSwaggerCodegen.NSEnums.SourceTypes.RAW });
                }
                return true;
            default: return false;
        }
    }

    public setOutputDir(value: string | NSSwaggerCodegen.OutputPaths): boolean {
        const result = this.findValueType(value);
        switch (result) {
            case NSSwaggerCodegen.NSEnums.ValueTypes.PATH: this._outputDir.setBoth(<string>value); return true;
            case NSSwaggerCodegen.NSEnums.ValueTypes.OUTPUT_PATHS: this._outputDir = new NSSwaggerCodegen.OutputPaths(<NSSwaggerCodegen.OutputPaths>value); return true;
            default: return false;
        }
    }

    private retrieveTemplate(): Promise<any> {
        if (this._template && this._template.path && this._template.path.uri) {
            switch (this._template.path.type) {
                case NSSwaggerCodegen.NSEnums.SourceTypes.LOCAL:
                    return new Promise((resolve, reject) => {
                        try {
                            // const template: string = fs.readFileSync(this._template.path.uri).toString();
                            resolve("retrieving template from local");
                        } catch (err) {
                            reject(err);
                        }
                    });
                case NSSwaggerCodegen.NSEnums.SourceTypes.EXTERNAL:
                    return new Promise((resolve, reject) => {
                        try {
                            console.log("retrieving template from external", process);
                            // get(this._template.path.uri, (response: IncomingMessage) => {
                            //     resolve(response);
                            // });
                            resolve("Done");
                        } catch (err) {
                            reject(err);
                        }
                    });
            }
        }
        return Promise.reject("Something went wrong");
    }

    private prepareMaterials(): Promise<any> {
        return this.retrieveTemplate();
    }

    public generate(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.prepareMaterials().then((response) => {
                console.log(response);
                resolve(response);
            }).catch((err) => console.error(err));
            // fs.writeFile("output/api.ts", this._loadedTemplate(this._data), (err: NodeJS.ErrnoException | null) => {
            //     if (err) {
            //         console.log("Error occured", err);
            //     }
            // });
        });
    }
}