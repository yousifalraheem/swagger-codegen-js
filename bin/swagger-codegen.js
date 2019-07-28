"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const models_1 = require("./models");
const enums_1 = require("./enums");
class SwaggerCodegen {
    constructor(options) {
        this._data = new models_1.CodegenData();
        this._template = new models_1.CodegenTemplate();
        this._outputDir = new models_1.OutputPaths().setBoth(process.cwd());
        if (options && typeof options === "object") {
            this.setData(options.data);
            this.setTemplate(options.template);
            this.setOutputDir(options.output);
        }
    }
    findValueType(value, ext) {
        let _PATH_REGEX = constants_1.PATH_REGEX;
        let _URL_REGEX = constants_1.URL_REGEX;
        if (value) {
            if (ext) {
                switch (ext) {
                    case "json":
                        _PATH_REGEX = constants_1.PATH_TO_JSON_REGEX;
                        _URL_REGEX = constants_1.URL_TO_JSON_REGEX;
                        break;
                    case "handlebars":
                        _PATH_REGEX = constants_1.PATH_TO_HANDLEBARS_REGEX;
                        _URL_REGEX = constants_1.URL_TO_HANDLEBARS_REGEX;
                        break;
                }
            }
            if (typeof value === "string") {
                if (_URL_REGEX.test(value)) {
                    return enums_1.Enums.ValueTypes.URL;
                }
                else if (_PATH_REGEX.test(value)) {
                    return enums_1.Enums.ValueTypes.PATH;
                }
                else if (constants_1.HANDLEBARS_TEMPLATE_REGEX.test(value)) {
                    return enums_1.Enums.ValueTypes.TEMPLATE;
                }
            }
            else if (typeof value === "object") {
                if (value.hasOwnProperty("api") && value.hasOwnProperty("model")) {
                    return enums_1.Enums.ValueTypes.OUTPUT_PATHS;
                }
                else {
                    return enums_1.Enums.ValueTypes.SCHEMA;
                }
            }
        }
        return enums_1.Enums.ValueTypes.UNKNOWN;
    }
    setData(value) {
        const result = this.findValueType(value, "json");
        switch (result) {
            case enums_1.Enums.ValueTypes.PATH:
                this._data.set("path", { uri: value, type: enums_1.Enums.SourceTypes.LOCAL });
                return true;
            case enums_1.Enums.ValueTypes.URL:
                this._data.set("path", { uri: value, type: enums_1.Enums.SourceTypes.EXTERNAL });
                return true;
            case enums_1.Enums.ValueTypes.SCHEMA:
                this._data.set("rawData", value);
                if (this._data.path.type === enums_1.Enums.SourceTypes.UNKNOWN) {
                    this._data.set("path", Object.assign({}, this._data.path, { type: enums_1.Enums.SourceTypes.RAW }));
                }
                return true;
            default: return false;
        }
    }
    setTemplate(value) {
        const result = this.findValueType(value, "handlebars");
        switch (result) {
            case enums_1.Enums.ValueTypes.PATH:
                this._template.set("path", { uri: value, type: enums_1.Enums.SourceTypes.LOCAL });
                return true;
            case enums_1.Enums.ValueTypes.URL:
                this._template.set("path", { uri: value, type: enums_1.Enums.SourceTypes.EXTERNAL });
                return true;
            case enums_1.Enums.ValueTypes.TEMPLATE:
                this._template.set("rawData", value);
                if (this._template.path.type === enums_1.Enums.SourceTypes.UNKNOWN) {
                    this._template.set("path", Object.assign({}, this._template.path, { type: enums_1.Enums.SourceTypes.RAW }));
                }
                return true;
            default: return false;
        }
    }
    setOutputDir(value) {
        const result = this.findValueType(value);
        switch (result) {
            case enums_1.Enums.ValueTypes.PATH:
                this._outputDir.setBoth(value);
                return true;
            case enums_1.Enums.ValueTypes.OUTPUT_PATHS:
                this._outputDir = new models_1.OutputPaths(value);
                return true;
            default: return false;
        }
    }
    retrieveTemplate() {
        if (this._template && this._template.path && this._template.path.uri) {
            switch (this._template.path.type) {
                case enums_1.Enums.SourceTypes.LOCAL:
                    return new Promise((resolve, reject) => {
                        try {
                            // const template: string = fs.readFileSync(this._template.path.uri).toString();
                            resolve("retrieving template from local");
                        }
                        catch (err) {
                            reject(err);
                        }
                    });
                case enums_1.Enums.SourceTypes.EXTERNAL:
                    return new Promise((resolve, reject) => {
                        try {
                            console.log("retrieving template from external", process);
                            // get(this._template.path.uri, (response: IncomingMessage) => {
                            //     resolve(response);
                            // });
                            resolve("Done");
                        }
                        catch (err) {
                            reject(err);
                        }
                    });
            }
        }
        return Promise.reject("Something went wrong");
    }
    prepareMaterials() {
        return this.retrieveTemplate();
    }
    generate() {
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
exports.SwaggerCodegen = SwaggerCodegen;
//# sourceMappingURL=swagger-codegen.js.map