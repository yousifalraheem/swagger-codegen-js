import { setHeaders, makeApiCall, ApiHeaders } from "./base";

export class PingApi {
    static setHeaders(headers: ApiHeaders) {
        setHeaders.call(PingApi, PingApi, headers)
        return setHeaders<PingApi>(headers) && PingApi;
    };

    static getPing(params: { apiVersion: string }) {
        return makeApiCall("/api/ping", "get", params);
    }
}
