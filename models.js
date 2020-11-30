const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const { getTypescriptType } = require("./utils")

module.exports = function (swagger, outputUrl) {
    if (swagger && swagger.components && swagger.components.schemas, Object.keys(swagger.components.schemas).length) {
        let output = ""
        const modelTemplateString = fs.readFileSync(path.resolve(__dirname, "./templates/model.handlebars")).toString()
        const enumTemplateString = fs.readFileSync(path.resolve(__dirname, "./templates/enum.handlebars")).toString()

        const modelTemplate = handlebars.compile(modelTemplateString)
        const enumTemplate = handlebars.compile(enumTemplateString)

        for (let name in swagger.components.schemas) {
            let model = swagger.components.schemas[name]
            let properties = []

            if (model.type === "object") {
                for (let propertyName in model.properties) {
                    let item = model.properties[propertyName]
                    properties.push({
                        propertyName,
                        type: getTypescriptType(item),
                        required: !!item.nullable
                    })
                    output += modelTemplate({ name, properties }) + "\n\n"
                }
            } else {
                output += enumTemplate({ name, enum: model.enum }) + "\n\n"
            }
        }
        fs.writeFileSync(path.resolve(outputUrl, "types.d.ts"), output)
    } else {
        console.log("No model found!")
    }
}
