import { Enums } from "./enums";

export class CodegenData implements IData {
    public rawData: SwaggerSchema.Spec;
    public path: CodegenPath;

    constructor(obj?: IData) {
        return obj ? this.set("rawData", obj.rawData).set("path", obj.path) : this.init();
    }

    public set(key: keyof CodegenData, value: any): CodegenData {
        if (key) { this[key] = value; }
        return this;
    }

    private init(): CodegenData {
        return this.set("rawData", null).set("path", { uri: "", type: Enums.SourceTypes.UNKNOWN });
    }
}

export class CodegenTemplate implements ITemplate {
    public rawData: string;
    public path: CodegenPath;

    constructor(obj?: CodegenTemplate) {
        return obj ? this.set("rawData", obj.rawData).set("path", obj.path) : this.init();
    }

    public set(key: keyof CodegenTemplate, value: any): CodegenTemplate {
        if (key) { this[key] = value; }
        return this;
    }

    private init(): CodegenTemplate {
        return this.set("rawData", null).set("path", { uri: "", type: Enums.SourceTypes.UNKNOWN });
    }
}

export class OutputPaths implements IOutputPaths {
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