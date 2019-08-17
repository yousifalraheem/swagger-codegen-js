import { SwaggerSchema } from "@typings/swagger-schema.type";

interface ISwaggerInfoSpec {
    title: string;
    appVersion: string;
    description: string;
    termsOfService: string;
    contact: ISwaggerContact;
    license: ISwaggerLicense;
    swaggerVersion: string;
    host: string;
    basePath: string;
    externalDocs: ISwaggerExternalDocs;
}

type ISwaggerContact = {
    name?: string;
    email?: string;
    url?: string;
};

type ISwaggerLicense = {
    name: string;
    url?: string;
};

type ISwaggerExternalDocs = {
    url: string;
    description?: string;
};

export class SwaggerInfoSpec implements ISwaggerInfoSpec {
    public title: string;
    public appVersion: string;
    public description: string;
    public termsOfService: string;
    public contact: ISwaggerContact;
    public license: ISwaggerLicense;
    public swaggerVersion: string;
    public host: string;
    public basePath: string;
    public externalDocs: ISwaggerExternalDocs;

    constructor(data: SwaggerSchema.SwaggerSpec) {
        if (data) {
            if (data.info) {
                data.info.title && (this.title = data.info.title);
                data.info.version && (this.appVersion = data.info.version);
                data.info.description && (this.description = data.info.description);
                data.info.termsOfService && (this.termsOfService = data.info.termsOfService);
                data.info.contact && (this.contact = data.info.contact);
                data.info.license && (this.license = data.info.license);
            }
            data.swagger && (this.swaggerVersion = data.swagger);
            data.host && (this.host = data.host);
            data.basePath && (this.basePath = data.basePath);
            data.externalDocs && (this.externalDocs = data.externalDocs);
        }
    }
}