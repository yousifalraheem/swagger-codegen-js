import Handlebars from "handlebars";
import fs from "fs";
import { get, IncomingMessage } from "http";
import _ from "lodash";
import { URL_REGEX, PATH_REGEX } from "./constants";
import { CodegenData, CodegenTemplate, OutputPaths } from "./models";

class SwaggerCodgen {
    private _data: CodegenData = new CodegenData();
    private _template: CodegenTemplate = new CodegenTemplate();
    private _loadedTemplate: Handlebars.TemplateDelegate<any>;
    private _outputDir: OutputPaths = new OutputPaths();

    constructor(options?: ConstructorOptions) {
        if (options && typeof options === "object") {
            this.setData(options.data);
            this.setTemplate(options.template);
            this.setOutputDir(<string | OutputPaths>options.outputPath);
        }
    }

    private findValueType(value: string | SwaggerSchema.Spec | OutputPaths): ValueTypes {
        if (value) {
            if (typeof value === "string") {
                if (URL_REGEX.test(value)) {
                    return ValueTypes.URL;
                } else if (PATH_REGEX.test(value)) {
                    return ValueTypes.PATH;
                } else {
                    return ValueTypes.TEMPLATE;
                }
            } else if (typeof value === "object") {
                if (value.hasOwnProperty("api") && value.hasOwnProperty("model")) {
                    return ValueTypes.OUTPUT_PATHS;
                } else {
                    return ValueTypes.SCHEMA;
                }
            }
        }
        return ValueTypes.UNKNOWN;
    }

    public setData(value: string | SwaggerSchema.Spec): boolean {
        switch (this.findValueType(value)) {
            case ValueTypes.PATH: this._data.set("path", { uri: <string>value, type: SourceTypes.LOCAL }); return true;
            case ValueTypes.URL: this._data.set("path", { uri: <string>value, type: SourceTypes.EXTERNAL }); return true;
            case ValueTypes.SCHEMA: this._data.set("rawData", <SwaggerSchema.Spec>value); return true;
            default: return false;
        }
    }

    public setTemplate(value: string): boolean {
        switch (this.findValueType(value)) {
            case ValueTypes.PATH: this._template.set("path", { uri: value, type: SourceTypes.LOCAL }); return true;
            case ValueTypes.URL: this._template.set("path", { uri: value, type: SourceTypes.EXTERNAL }); return true;
            case ValueTypes.SCHEMA: this._template.set("rawData", value); return true;
            default: return false;
        }
    }

    public setOutputDir(value: string | OutputPaths): boolean {
        switch (this.findValueType(value)) {
            case ValueTypes.PATH: case ValueTypes.URL: this._outputDir.setBoth(<string>value); return true;
            case ValueTypes.OUTPUT_PATHS: this._outputDir = new OutputPaths(<OutputPaths>value); return true;
            default: return false;
        }
    }

    private retrieveTemplate(): Promise<any> {
        if (this._template && this._template.path && this._template.path.uri) {
            switch (this._template.path.type) {
                case SourceTypes.LOCAL:
                    return new Promise((resolve, reject) => {
                        try {
                            const template: string = fs.readFileSync(this._template.path.uri).toString();
                            resolve(template);
                        } catch (err) {
                            reject(err);
                        }
                    })
                case SourceTypes.EXTERNAL:
                    return new Promise((resolve, reject) => {
                        try {
                            get(this._template.path.uri, (response: IncomingMessage) => {
                                resolve(response);
                            });
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

export { SwaggerCodgen };