const fs = require("fs")
const path = require("path")
const models = require("./models")
const apis = require("./apis")

const swaggerUrl = path.resolve(process.cwd(), "swagger.json")
const outputUrl = path.resolve(process.cwd(), "output")
console.log("swaggerUrl", swaggerUrl)

let swagger

try {
    swagger = JSON.parse(fs.readFileSync(swaggerUrl).toString())
} catch (e) {
    throw new Error(e)
}

if (fs.existsSync(outputUrl)) {
    fs.rmdirSync(outputUrl, { recursive: true })
    fs.mkdirSync(outputUrl)
} else {
    fs.mkdirSync(outputUrl)
}

models(swagger, outputUrl)
apis(swagger, outputUrl)

// Copy base.ts file
let base = fs.readFileSync(path.resolve(__dirname, "base.ts")).toString().replace("{#base#}", swagger.servers[0].url);
fs.writeFileSync(path.resolve(outputUrl, "base.ts"), base);
