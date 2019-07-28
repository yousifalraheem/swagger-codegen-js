import Handlebars from "handlebars";
// import fs from "fs";
// import { get, IncomingMessage } from "http";
import _ from "lodash";
import { URL_REGEX, PATH_REGEX, URL_TO_JSON_REGEX, PATH_TO_JSON_REGEX, URL_TO_HANDLEBARS_REGEX, PATH_TO_HANDLEBARS_REGEX, HANDLEBARS_TEMPLATE_REGEX } from "./constants";
import { CodegenData, CodegenTemplate, OutputPaths } from "./models";
import { Enums } from "./enums";

class SwaggerCodegen {
    private _data: CodegenData = new CodegenData();
    private _template: CodegenTemplate = new CodegenTemplate();
    private _outputDir: OutputPaths = new OutputPaths().setBoth(process.cwd());
    private _loadedTemplate: Handlebars.TemplateDelegate<any>;

    constructor(options?: ConstructorOptions) {
        if (options && typeof options === "object") {
            this.setData(options.data);
            this.setTemplate(options.template);
            this.setOutputDir(<string | OutputPaths>options.output);
        }
    }

    private findValueType(value: string | SwaggerSchema.Spec | OutputPaths, ext?: "json" | "handlebars"): Enums.ValueTypes {
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
                    return Enums.ValueTypes.URL;
                } else if (_PATH_REGEX.test(value)) {
                    return Enums.ValueTypes.PATH;
                } else if (HANDLEBARS_TEMPLATE_REGEX.test(value)) {
                    return Enums.ValueTypes.TEMPLATE;
                }
            } else if (typeof value === "object") {
                if (value.hasOwnProperty("api") && value.hasOwnProperty("model")) {
                    return Enums.ValueTypes.OUTPUT_PATHS;
                } else {
                    return Enums.ValueTypes.SCHEMA;
                }
            }
        }
        return Enums.ValueTypes.UNKNOWN;
    }

    public setData(value: string | SwaggerSchema.Spec): boolean {
        const result = this.findValueType(value, "json");
        switch (result) {
            case Enums.ValueTypes.PATH: this._data.set("path", { uri: <string>value, type: Enums.SourceTypes.LOCAL }); return true;
            case Enums.ValueTypes.URL: this._data.set("path", { uri: <string>value, type: Enums.SourceTypes.EXTERNAL }); return true;
            case Enums.ValueTypes.SCHEMA:
                this._data.set("rawData", <SwaggerSchema.Spec>value);
                if (this._data.path.type === Enums.SourceTypes.UNKNOWN) {
                    this._data.set("path", { ...this._data.path, type: Enums.SourceTypes.RAW });
                }
                return true;
            default: return false;
        }
    }

    public setTemplate(value: string): boolean {
        const result = this.findValueType(value, "handlebars");
        switch (result) {
            case Enums.ValueTypes.PATH: this._template.set("path", { uri: value, type: Enums.SourceTypes.LOCAL }); return true;
            case Enums.ValueTypes.URL: this._template.set("path", { uri: value, type: Enums.SourceTypes.EXTERNAL }); return true;
            case Enums.ValueTypes.TEMPLATE:
                this._template.set("rawData", value);
                if (this._template.path.type === Enums.SourceTypes.UNKNOWN) {
                    this._template.set("path", { ...this._template.path, type: Enums.SourceTypes.RAW });
                }
                return true;
            default: return false;
        }
    }

    public setOutputDir(value: string | OutputPaths): boolean {
        const result = this.findValueType(value);
        switch (result) {
            case Enums.ValueTypes.PATH: this._outputDir.setBoth(<string>value); return true;
            case Enums.ValueTypes.OUTPUT_PATHS: this._outputDir = new OutputPaths(<OutputPaths>value); return true;
            default: return false;
        }
    }

    private retrieveTemplate(): Promise<any> {
        if (this._template && this._template.path && this._template.path.uri) {
            switch (this._template.path.type) {
                case Enums.SourceTypes.LOCAL:
                    return new Promise((resolve, reject) => {
                        try {
                            // const template: string = fs.readFileSync(this._template.path.uri).toString();
                            resolve("retrieving template from local");
                        } catch (err) {
                            reject(err);
                        }
                    });
                case Enums.SourceTypes.EXTERNAL:
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

export { SwaggerCodegen };