import { SwaggerSchema } from "@typings/swagger-schema.type";

export type SwaggerMethodSpecOptions = {

};

export class SwaggerMethodSpec {
    public options: SwaggerMethodSpecOptions;
    public parameters: Array<SwaggerSchema.Parameter>;

    constructor(data: any) {
        if (data) {
            console.log("");
        }
    }
}