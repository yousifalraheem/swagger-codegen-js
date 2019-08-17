import { SwaggerSchema } from "@typings/swagger-schema.type";

export class SwaggerClassSpec {
    constructor(data: SwaggerSchema.SwaggerSpec) {
        if (data && (data.definitions || data.tags || data.paths)) {
            console.log("Constructed");
        }
    }

    
}