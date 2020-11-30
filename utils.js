function getTypescriptType(schema) {
    if (schema.type) {
        switch (schema.type.toLowerCase()) {
            case "string": return "string"
            case "integer":
            case "int":
            case "number":
                return "number"
            case "array":
                let arrayType = schema.items.type ? schema.items.type : schema.items["$ref"].split("/").pop()
                return `Array<${arrayType}>`
            case "boolean":
            case "bool":
                return "boolean"
            default: return schema.type
        }
    } else if (schema["$ref"]) {
        return "IApi" + schema["$ref"].split("/").pop()
    }
}

const capitalize = input => input ? input[0].toUpperCase() + input.substr(1) : input
const camelcasify = input => input ? input[0].toLowerCase() + input.substr(1) : input

const toReadable = (input, pascalCase = true) => input ? input
    .split("-")
    .map((item, i) => i === 0 ? pascalCase ? capitalize(item) : item : capitalize(item))
    .join("")
    : input

module.exports = {
    getTypescriptType,
    capitalize,
    camelcasify,
    toReadable,
}