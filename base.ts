export type ApiHeaders = { [key: string]: string };

const Headers: Map<string, string> = new Map();
const base: string = "{#base#}";

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

        fetch(url.href, { method })
            .then((buffer) => buffer.json())
            .then(resolve)
            .catch(reject);
    })
        .then((data: T) => {
            console.log("Response interceptor here");
            return data;
        })
        .finally(() => {
            Headers.clear();
        });
}
