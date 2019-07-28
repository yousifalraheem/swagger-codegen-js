import { expect } from "chai";
import { CodegenTemplate } from "../src/models";
import { describe } from "mocha";
import { Enums } from "../src/enums";
const swaggerSchema = require("../example/data/swagger.json");

describe("Model: Codegen Template", () => {
    let codegenTemplate: CodegenTemplate;
    const initialValue = { rawData: null, path: { uri: "", type: Enums.SourceTypes.UNKNOWN } };

    beforeEach(() => {
        codegenTemplate = new CodegenTemplate();
    });

    it("Should initialize instance correctly", () => {
        expect(codegenTemplate).not.to.be.empty;
        expect(typeof codegenTemplate.path).to.equal("object");
    });

    it(`Should have default values { rawData: null, path: { uri: '', type: '${Enums.SourceTypes.UNKNOWN}' } }`, () => {
        expect(codegenTemplate.path.uri).to.equal("");
        expect(codegenTemplate.path.type).to.equal(Enums.SourceTypes.UNKNOWN);
        expect(codegenTemplate.rawData).to.be.null;
    });

    it(`Should use the values passed in constructor`, () => {
        const testData = {
            rawData: "some template {{here}}",
            path: {
                uri: "",
                type: Enums.SourceTypes.RAW
            }
        };
        codegenTemplate = new CodegenTemplate(testData);
        expect(codegenTemplate.path.uri).to.equal(testData.path.uri);
        expect(codegenTemplate.path.type).to.equal(testData.path.type);
        expect(codegenTemplate.rawData).to.equal(testData.rawData);
    });

    it("Should set value with *set* method", () => {
        const testData = {
            rawData: "some template",
            path: {
                uri: "../example/templates/template.handlebars",
                type: Enums.SourceTypes.LOCAL
            }
        };
        codegenTemplate = new CodegenTemplate().set("path", testData.path);
        expect(codegenTemplate.path.uri).to.equal(testData.path.uri);
        expect(codegenTemplate.path.type).to.equal(testData.path.type);
    });

    it("Should do nothing when trying to set with an empty key", () => {
        codegenTemplate.set(null, swaggerSchema);
        expect(codegenTemplate.rawData).to.equal(initialValue.rawData);
        expect(codegenTemplate.path.uri).to.equal(initialValue.path.uri);
        expect(codegenTemplate.path.type).to.equal(initialValue.path.type);
    });
});