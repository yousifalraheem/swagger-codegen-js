import { setHeaders, makeApiCall, ApiHeaders } from "./base";

export class AuthApi {
    static setHeaders(headers: ApiHeaders) {
        setHeaders.call(AuthApi, AuthApi, headers)
        return setHeaders<AuthApi>(headers) && AuthApi;
    };

    static logout(params: { apiVersion: string }) {
        return makeApiCall("/api/auth/logout", "get", params);
    }
    static inactivity(params: { apiVersion: string }) {
        return makeApiCall("/api/auth/inactivity", "get", params);
    }
}
