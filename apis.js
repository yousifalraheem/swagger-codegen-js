const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const { camelcasify, toReadable, getTypescriptType } = require("./utils")

module.exports = function (swagger, outputUrl) {
    if (swagger && swagger.paths && Object.keys(swagger.paths).length) {
        const controllers = {}
        const reg = new RegExp(/(\/api\/)(v\d\/)?/g)

        const apiTemplateString = fs.readFileSync(path.resolve(__dirname, "./templates/api.handlebars")).toString()
        const apiTemplate = handlebars.compile(apiTemplateString)

        for (let path in swagger.paths) {
            let methods = Object.keys(swagger.paths[path])
            let [api, methodName] = path.replace(reg, "").split("/").map((item, i) => toReadable(item, !i))

            methods.forEach(method => {
                let operation = swagger.paths[path][method]
                api = toReadable(operation.tags[0]) || api
                methodName = camelcasify(operation.operationId, false) || methodName

                let newEndpoint = {
                    method,
                    methodName: methodName || method + api,
                    path,
                    summary: operation.summary
                };

                if (operation.parameters) {
                    let parameters = []
                    operation.parameters.forEach(parameter => {
                        parameters.push({
                            name: toReadable(parameter.name, false),
                            in: parameter.in,
                            description: parameter.description,
                            type: getTypescriptType(parameter.schema),
                        })
                    })

                    newEndpoint.queryParams = parameters.filter(param => param.in === "query")
                }

                if (operation.requestBody) {
                    let bodySchema = Object.values(operation.requestBody.content)[0].schema
                    newEndpoint.body = getTypescriptType(bodySchema)
                }

                if (controllers.hasOwnProperty(api)) {
                    let oldApi = controllers[api]
                    controllers[api] = { ...oldApi, endpoints: [...oldApi.endpoints, newEndpoint] }
                } else {
                    controllers[api] = { name: api, endpoints: [newEndpoint] }
                }
            })
        }
        for (let controller in controllers) {
            fs.writeFileSync(path.resolve(outputUrl, `${controller}.api.ts`), apiTemplate(controllers[controller]))
        }
        console.log(JSON.stringify(controllers, null, 4))
    } else {
        console.log("No apis found!")
    }
}
