declare interface IApiAuthResponse {
    logoutUrl?: string;
}

declare interface IApiAuthResponse {
    logoutUrl?: string;
    redirectUrl?: string;
}

declare interface IApiFileConfig {
    path?: string;
}

declare interface IApiFileConfig {
    path?: string;
    order: number;
}

declare interface IApiFileConfig {
    path?: string;
    order: number;
    inline: boolean;
}

declare interface IApiShellConfig {
    html?: string;
}

declare interface IApiShellConfig {
    html?: string;
    js?: Array<FileConfig>;
}

declare interface IApiShellConfig {
    html?: string;
    js?: Array<FileConfig>;
    css?: Array<FileConfig>;
}

declare interface IApiShellConfig {
    html?: string;
    js?: Array<FileConfig>;
    css?: Array<FileConfig>;
    bootstrap?: string;
}

declare interface IApiPhoneNumber {
    countryCode?: string;
}

declare interface IApiPhoneNumber {
    countryCode?: string;
    number?: string;
}

declare interface IApiPhoneNumber {
    countryCode?: string;
    number?: string;
    hasCountryCode: boolean;
}

declare interface IApiContactInfo {
    email?: string;
}

declare interface IApiContactInfo {
    email?: string;
    phoneNumber: IApiPhoneNumber;
}

declare interface IApiContactInfo {
    email?: string;
    phoneNumber: IApiPhoneNumber;
    phoneNumberHome: IApiPhoneNumber;
}

declare interface IApiContactInfo {
    email?: string;
    phoneNumber: IApiPhoneNumber;
    phoneNumberHome: IApiPhoneNumber;
    phoneNumberWork: IApiPhoneNumber;
}

declare interface IApiContactInfo {
    email?: string;
    phoneNumber: IApiPhoneNumber;
    phoneNumberHome: IApiPhoneNumber;
    phoneNumberWork: IApiPhoneNumber;
    readOnly: boolean;
}

declare type IApiContactType =
    "email" |
    "phoneNumber" |
    "phoneNumberHome" |
    "phoneNumberWork";


declare interface IApiUpdateContactInformationRequest {
    type: IApiContactType;
}

declare interface IApiUpdateContactInformationRequest {
    type: IApiContactType;
    email?: string;
}

declare interface IApiUpdateContactInformationRequest {
    type: IApiContactType;
    email?: string;
    phoneNumberHome?: string;
}

declare interface IApiUpdateContactInformationRequest {
    type: IApiContactType;
    email?: string;
    phoneNumberHome?: string;
    phoneNumberWork?: string;
}

declare interface IApiUpdateContactInformationCommandResult {
    updateId: string;
}

declare interface IApiUpdateContactInformationCommandResult {
    updateId: string;
    signingOrderId: string;
}

declare type IApiHttpStatusCode =
    "continue" |
    "switchingProtocols" |
    "processing" |
    "earlyHints" |
    "ok" |
    "created" |
    "accepted" |
    "nonAuthoritativeInformation" |
    "noContent" |
    "resetContent" |
    "partialContent" |
    "multiStatus" |
    "alreadyReported" |
    "imUsed" |
    "ambiguous" |
    "moved" |
    "redirect" |
    "redirectMethod" |
    "notModified" |
    "useProxy" |
    "unused" |
    "temporaryRedirect" |
    "permanentRedirect" |
    "badRequest" |
    "unauthorized" |
    "paymentRequired" |
    "forbidden" |
    "notFound" |
    "methodNotAllowed" |
    "notAcceptable" |
    "proxyAuthenticationRequired" |
    "requestTimeout" |
    "conflict" |
    "gone" |
    "lengthRequired" |
    "preconditionFailed" |
    "requestEntityTooLarge" |
    "requestUriTooLong" |
    "unsupportedMediaType" |
    "requestedRangeNotSatisfiable" |
    "expectationFailed" |
    "misdirectedRequest" |
    "unprocessableEntity" |
    "locked" |
    "failedDependency" |
    "upgradeRequired" |
    "preconditionRequired" |
    "tooManyRequests" |
    "requestHeaderFieldsTooLarge" |
    "unavailableForLegalReasons" |
    "internalServerError" |
    "notImplemented" |
    "badGateway" |
    "serviceUnavailable" |
    "gatewayTimeout" |
    "httpVersionNotSupported" |
    "variantAlsoNegotiates" |
    "insufficientStorage" |
    "loopDetected" |
    "notExtended" |
    "networkAuthenticationRequired";


declare interface IApiError {
    code?: string;
}

declare interface IApiError {
    code?: string;
    message?: string;
}

declare interface IApiError {
    code?: string;
    message?: string;
    targetField?: string;
}

declare interface IApiErrorResponse {
    statusCode: IApiHttpStatusCode;
}

declare interface IApiErrorResponse {
    statusCode: IApiHttpStatusCode;
    title?: string;
}

declare interface IApiErrorResponse {
    statusCode: IApiHttpStatusCode;
    title?: string;
    errors?: Array<Error>;
}

declare interface IApiDeleteContactInformationRequest {
    type: IApiContactType;
}

declare interface IApiCompleteRequest {
    updateId: string;
}

declare interface IApiCompleteContactInformationCommandResult {
    isSuccessful: boolean;
}

declare interface IApiCompleteContactInformationCommandResult {
    isSuccessful: boolean;
    errors?: Array<string>;
}

declare interface IApiAddMobilePhoneNumberRequest {
    phoneNumber?: string;
}

declare interface IApiAddOrUpdateMobileCommandResult {
    updateId: string;
}

declare interface IApiUpdateMobilePhoneNumberRequest {
    verifyPhoneNumber?: string;
}

declare interface IApiUpdateMobilePhoneNumberRequest {
    verifyPhoneNumber?: string;
    phoneNumber?: string;
}

declare interface IApiDeleteMobilePhoneNumberRequest {
    verifyPhoneNumber?: string;
}

declare interface IApiDeleteMobileCommandResult {
    updateId: string;
}

declare interface IApiDeleteMobileCommandResult {
    updateId: string;
    signingOrderId: string;
}

declare interface IApiVerifyOtpRequest {
    otp?: string;
}

declare interface IApiVerifyOtpRequest {
    otp?: string;
    updateId?: string;
}

declare interface IApiProblemDetails {
    type?: string;
}

declare interface IApiProblemDetails {
    type?: string;
    title?: string;
}

declare interface IApiProblemDetails {
    type?: string;
    title?: string;
    status?: number;
}

declare interface IApiProblemDetails {
    type?: string;
    title?: string;
    status?: number;
    detail?: string;
}

declare interface IApiProblemDetails {
    type?: string;
    title?: string;
    status?: number;
    detail?: string;
    instance?: string;
}

declare interface IApiVerifyOtpResult {
    updateId: string;
}

declare interface IApiVerifyOtpResult {
    updateId: string;
    signingOrderId?: string;
}

