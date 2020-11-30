import { setHeaders, makeApiCall, ApiHeaders } from "./base";

export class ConfigApi {
    static setHeaders(headers: ApiHeaders) {
        setHeaders.call(ConfigApi, ConfigApi, headers)
        return setHeaders<ConfigApi>(headers) && ConfigApi;
    };

    static getConfig(params: { apiVersion: string }) {
        return makeApiCall("/api/config", "get", params);
    }
}
