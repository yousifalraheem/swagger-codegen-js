import { setHeaders, makeApiCall, ApiHeaders } from "./base";

export class OtpApi {
    static setHeaders(headers: ApiHeaders) {
        setHeaders.call(OtpApi, OtpApi, headers)
        return setHeaders<OtpApi>(headers) && OtpApi;
    };

    static verifyOtp() {
        return makeApiCall("/api/v1/otp/verify", "post");
    }
}
