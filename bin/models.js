"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
class CodegenData {
    constructor(obj) {
        return obj ? this.set("rawData", obj.rawData).set("path", obj.path) : this.init();
    }
    set(key, value) {
        if (key) {
            this[key] = value;
        }
        return this;
    }
    init() {
        return this.set("rawData", null).set("path", { uri: "", type: enums_1.Enums.SourceTypes.UNKNOWN });
    }
}
exports.CodegenData = CodegenData;
class CodegenTemplate {
    constructor(obj) {
        return obj ? this.set("rawData", obj.rawData).set("path", obj.path) : this.init();
    }
    set(key, value) {
        if (key) {
            this[key] = value;
        }
        return this;
    }
    init() {
        return this.set("rawData", null).set("path", { uri: "", type: enums_1.Enums.SourceTypes.UNKNOWN });
    }
}
exports.CodegenTemplate = CodegenTemplate;
class OutputPaths {
    constructor(obj) {
        if (obj) {
            if (typeof obj === "string") {
                return this.setBoth(obj);
            }
            else if (typeof obj === "object") {
                return this.set("api", obj.api).set("model", obj.model);
            }
        }
        return this.init();
    }
    set(key, value) {
        if (key) {
            this[key] = value;
        }
        return this;
    }
    setBoth(value) {
        this.set("api", value).set("model", value);
        return this;
    }
    init() {
        return this.set("api", "").set("model", "");
    }
}
exports.OutputPaths = OutputPaths;
//# sourceMappingURL=models.js.map