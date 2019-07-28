const SwaggerCodegen = require('../bin/index').default;
const swaggerJSONSample = "https://petstore.swagger.io/v2/swagger.json";

const samples = {
    data: {
        raw: { swagger: 2.3, info: { name: "module name" } },
        path: "./data/data.json",
        url: "https://mysite.se/data/data.json"
    },
    template: {
        raw: "Welcome {{swagger}}",
        path: "./templates/template.handlebars",
        url: "https://mysite.se/templates/template.handlebars"
    },
    output: {
        api: "src/app/apis/generated",
        model: "src/app/models"
    }
}

console.clear();

const codegen = new SwaggerCodegen({
    data: samples.data.raw,
    template: samples.template.raw,
    output: { ...samples.output }
});

let { _data, _template, _outputDir } = codegen;

console.table({
    output: {
        object: "Data",
        rawData: JSON.stringify(_data.rawData),
        path: _data.path.uri,
        pathType: _data.path.type
    }
});
console.table({
    output: {
        object: "Template",
        rawData: _template.rawData,
        path: _template.path.uri, pathType: _template.path.type
    }
});
console.table({
    output: {
        object: "Output",
        api: _outputDir.api,
        model: _outputDir.model
    }
});