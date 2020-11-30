import { setHeaders, makeApiCall, ApiHeaders } from "./base";

export class ContactInformationApi {
    static setHeaders(headers: ApiHeaders) {
        setHeaders.call(ContactInformationApi, ContactInformationApi, headers)
        return setHeaders<ContactInformationApi>(headers) && ContactInformationApi;
    };

    static getContactInformation() {
        return makeApiCall("/api/v1/contact-information", "get");
    }
    static updateContactInformation() {
        return makeApiCall("/api/v1/contact-information/update", "post");
    }
    static deleteContactInformation() {
        return makeApiCall("/api/v1/contact-information/delete", "post");
    }
    static completeContactInformationUpdate() {
        return makeApiCall("/api/v1/contact-information/complete", "post");
    }
    static addMobilePhoneNumber() {
        return makeApiCall("/api/v1/contact-information/add-mobile", "post");
    }
    static updateMobilePhoneNumber() {
        return makeApiCall("/api/v1/contact-information/update-mobile", "post");
    }
    static deleteMobilePhoneNumber() {
        return makeApiCall("/api/v1/contact-information/delete-mobile", "post");
    }
}
