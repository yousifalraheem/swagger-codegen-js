import { expect } from "chai";
import { CodegenData } from "../src/models";
import { describe } from "mocha";
import { Enums } from "../src/enums";
const swaggerSchema = require("../example/data/swagger.json");

describe("Model: Codegen Data", () => {
    let codegenData: CodegenData;
    const initialValue = { rawData: null, path: { uri: "", type: Enums.SourceTypes.UNKNOWN } };

    beforeEach(() => {
        codegenData = new CodegenData();
    });

    it("Should initialize instance correctly", () => {
        expect(codegenData).not.to.be.empty;
        expect(typeof codegenData.path).to.equal("object");
    });

    it(`Should have default values ${JSON.stringify(initialValue)}`, () => {
        expect(codegenData.path.uri).to.equal(initialValue.path.uri);
        expect(codegenData.path.type).to.equal(initialValue.path.type);
        expect(codegenData.rawData).to.equal(initialValue.rawData);
    });

    it(`Should use the values passed in constructor`, () => {
        const testData = {
            rawData: swaggerSchema,
            path: {
                uri: "",
                type: Enums.SourceTypes.RAW
            }
        };
        codegenData = new CodegenData(testData);
        expect(codegenData.path.uri).to.equal(testData.path.uri);
        expect(codegenData.path.type).to.equal(testData.path.type);
        expect(codegenData.rawData).to.equal(testData.rawData);
    });

    it("Should set value with *set* method", () => {
        const testData = {
            rawData: {},
            path: {
                uri: "../example/data/data.json",
                type: Enums.SourceTypes.LOCAL
            }
        };
        codegenData = new CodegenData().set("path", testData.path);
        expect(codegenData.path.uri).to.equal(testData.path.uri);
        expect(codegenData.path.type).to.equal(testData.path.type);
    });

    it("Should do nothing when trying to set with an empty key", () => {
        codegenData.set(null, swaggerSchema);
        expect(codegenData.rawData).to.equal(initialValue.rawData);
        expect(codegenData.path.uri).to.equal(initialValue.path.uri);
        expect(codegenData.path.type).to.equal(initialValue.path.type);
    });
});