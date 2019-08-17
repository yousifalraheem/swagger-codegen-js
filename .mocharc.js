module.exports = {
    extension: [
        "ts"
    ],
    spec: "test/**/*.spec.ts",
    require: "ts-node/register",
    opts: "./test/mocha.opts"
};