import { expect } from "chai";
import { OutputPaths } from "../src/models/SwaggerCodegen";
import { describe } from "mocha";

const swaggerSchema = require("../example/data/swagger.json");

describe("Model: Output Paths", () => {
    const initialValue = { api: "", model: "" };
    let outputPaths: OutputPaths;

    beforeEach(() => {
        outputPaths = new OutputPaths();
    });

    it("Should initialize instance correctly", () => {
        expect(outputPaths).not.to.be.empty;
        expect(typeof outputPaths).to.equal("object");
    });

    it("Should initialize empty paths", () => {
        expect(outputPaths.api).to.equal(initialValue.api);
        expect(outputPaths.model).to.equal(initialValue.model);
    });

    it("Should initalize both paths when passing one path to constructor", () => {
        outputPaths = new OutputPaths("../lib");
        expect(outputPaths.api).to.equal("../lib");
        expect(outputPaths.model).to.equal("../lib");
    });

    it("Should initalize different paths when passed to constructor { api: '../lib', model: '../models' }", () => {
        outputPaths = new OutputPaths(<OutputPaths>{ api: "../lib", model: "../models" });
        expect(outputPaths.api).to.equal("../lib");
        expect(outputPaths.model).to.equal("../models");
    });

    it("Should do nothing when trying to set with an empty key", () => {
        outputPaths.set(null, "./testing");
        expect(outputPaths.api).to.equal(initialValue.api);
        expect(outputPaths.model).to.equal(initialValue.model);
    });

    it("Should inititialize if wrong type passed to constructor", () => {
        outputPaths = new OutputPaths(true as any);
        expect(outputPaths.api).to.equal(initialValue.api);
        expect(outputPaths.model).to.equal(initialValue.model);
    });
});