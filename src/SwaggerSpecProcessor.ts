import { SwaggerInfoSpec } from "@models/SwaggerInfoSpec.model";
import { SwaggerClassSpec } from "@models/SwaggerClassSpec.model";
import { SwaggerSchema } from "@typings/swagger-schema.type";

export class SwaggerSpecProcessor {
    private info: SwaggerInfoSpec;
    private classes: Array<SwaggerClassSpec>;

    constructor(data: SwaggerSchema.SwaggerSpec) {
        if (data) {
            this.process(data);
        } else {
            console.warn("No data provided!");
        }
    }

    private process(data: SwaggerSchema.SwaggerSpec): void {
        if (data) {
            this.info = new SwaggerInfoSpec(data);
        }
    }
}