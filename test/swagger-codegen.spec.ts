import { expect } from "chai";
import { SwaggerCodegen } from "../src/swagger-codegen";
import { describe } from "mocha";

// const swaggerSchema = require("../example/data/swagger.json");

describe("Model: Output Paths", () => {
    // const initialValue = { api: "", model: "" };
    let codegen: SwaggerCodegen;

    beforeEach(() => {
        codegen = new SwaggerCodegen();
    });

    it("Should initialize instance correctly", () => {
        expect(codegen).not.to.be.empty;
        expect(typeof codegen).to.equal("object");
    });
});