export type ApiHeaders = { [key: string]: string };

const Headers: Map<string, string> = new Map();
const base: string = "https://contactinformationapi-devtest.cumulus.sebank.se";

export function setHeaders<T>(caller: T, headers: ApiHeaders = {}): T {
    if (headers && Object.keys(headers).length) {
        for (let header in headers) {
            Headers.set(header, headers[header]);
        }
    }
    return caller;
}

export function makeApiCall<T = any>(
    path: string,
    method: string,
    params?: ApiHeaders
): Promise<T> {
    return new Promise((resolve, reject) => {
        console.log("Request interceptor here");

        const url: URL = new URL(path, base);

        if (params && Object.keys(params).length) {
            for (let param in params) {
                url.searchParams.set(param, params[param]);
            }
        }

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });

        xhr.open(
            "GET",
            "https://contactinformationapi-devtest.cumulus.sebank.se/api/v1/contact-information"
        );

        xhr.send();

        fetch(url.href, { method })
            .then((buffer) => buffer.json())
            .then(resolve)
            .catch(reject);
    })
        .then((data: T) => {
            console.log("Response interceptor here");
            return data;
        })
        .catch((reason: any) => {
            console.log("Response interceptor here");
            return reason;
        })
        .finally(() => {
            Headers.clear();
        });
}

function makeXHR(
    url: string,
    method: string,
    withCredentials: boolean = false
) {
    var xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.withCredentials = withCredentials;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open(method, url);

    xhr.send();
}

/*
 *================================
 *=========Experimental===========
 *================================
 */

type RequestBody =
    | string
    | Document
    | Blob
    | ArrayBufferView
    | ArrayBuffer
    | FormData
    | URLSearchParams
    | Document
    | BodyInit
    | null;

class Experiment {
    public ajax(
        request: {
            url?: string;
            method?: string;
            username?: string;
            password?: string;
            body?: RequestBody;
        } = {}
    ) {
        const promise: Promise<any> & {
            onProgress?: (callback: any) => void;
        } = new Promise((resolve, reject) => {
            var xhttp = new XMLHttpRequest();
            xhttp.addEventListener("error", e => reject(e), false);
            xhttp.addEventListener("timeout", e => reject(e), false);
            xhttp.addEventListener("abort", (e) => {
                if (xhttp.timeo)
            }, false);

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    resolve({
                        data: xhttp.responseText,
                        status: xhttp.status,
                        statusText: xhttp.statusText,
                    });
                }
            };

            promise.constructor.prototype.onProgress = (
                callback: (event: { percentage: number; loaded: number; total: number; }) => void
            ) => {
                xhttp.onprogress = function (e) {
                    if (e.lengthComputable) {
                        var percentage: number = Math.round((e.loaded / e.total) * 100);
                        callback({ loaded: e.loaded, total: e.total, percentage })
                    } else {
                        callback({ percentage: 0, loaded: 0, total: 0 });
                    }
                }
            };

            promise.constructor.prototype.abort = () => xhttp.abort();

            xhttp.open(
                request.method,
                request.url,
                true,
                request.username,
                request.password
            );
            xhttp.send(request.body);
        });

        promise.onProgress;

        return promise;
    }
}
