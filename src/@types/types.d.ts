declare type CodegenPath = {
    uri: string;
    type: SourceTypes;
}

declare type ConstructorOptions = {
    /**
     * The [**Handlebars**](https://handlebarsjs.com) template that will be used to generate **APIs** and **Models**
     */
    template: string;
    /**
     * The data to be used to populate the template
     */
    data: string | SwaggerSchema.Spec;
    /**
     * The output path of the generated files
     */
    outputPath: string | IOutputPaths;
};