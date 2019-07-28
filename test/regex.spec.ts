import { URL_REGEX, URL_TO_JSON_REGEX, URL_TO_HANDLEBARS_REGEX, PATH_REGEX, PATH_TO_JSON_REGEX, PATH_TO_HANDLEBARS_REGEX, HANDLEBARS_TEMPLATE_REGEX } from "../src/constants";
import { describe } from "mocha";
import { expect } from "chai";

describe("REGEX: URL_REGEX", () => {
    let _URL_REGEX: RegExp;

    beforeEach(() => {
        _URL_REGEX = new RegExp(URL_REGEX.source, URL_REGEX.flags);
    });

    describe("Accepts", () => {
        const correctURLs: Array<string> = [
            "https://www.example.com/swagger",
            "http://www.example.com/swagger",
            "http://www.example.com:3000/swagger",
            "example.ae/swagger",
            "localhost:3000/swagger",
            "0.0.0.0:123123/swagger",
            "127.12.21.3:3234/swagger",
            "https://example.se/swagger/swagger.json",
        ];
        correctURLs.map((item: string) => {
            it(item, () => {
                const result = _URL_REGEX.test(item);
                expect(result).to.be.true;
            });
        });
    });

    describe("Denies", () => {
        const correctURLs: Array<string> = [
            "https://example/swagger",
            "http://example/swagger",
            "http//swagger",
            "localhost:32423423423423/swagger",
            "https://example.se/swagger/swagger$%^&*()",
        ];
        correctURLs.map((item: string) => {
            it(item, () => {
                const result = _URL_REGEX.test(item);
                expect(result).to.be.false;
            });
        });
    });
});

describe("REGEX: URL_TO_JSON_REGEX", () => {
    let _URL_REGEX: RegExp;

    beforeEach(() => {
        _URL_REGEX = new RegExp(URL_TO_JSON_REGEX.source, URL_TO_JSON_REGEX.flags);
    });

    describe("Accepts", () => {
        const correctURLs: Array<string> = [
            "https://www.example.com/swagger.json",
            "http://www.example.com/swagger.json",
            "http://www.example.com:3000/swagger.json",
            "example.ae/swagger.json",
            "localhost:3000/swagger.json",
            "0.0.0.0:123123/swagger.json",
            "127.12.21.3:3234/swagger.json",
            "https://example.se/swagger/swagger.json",
        ];
        correctURLs.map((item: string) => {
            it(item, () => {
                const result = _URL_REGEX.test(item);
                expect(result).to.be.true;
            });
        });
    });

    describe("Denies", () => {
        const correctURLs: Array<string> = [
            "https://example/swagger",
            "http://example/swagger",
            "http//swagger",
            "localhost:32423423423423/swagger",
            "https://example.se/swagger/swagger$%^&*()",
            "https://www.example.com/swagger",
            "example.ae/swagger",
            "localhost:3000/swagger",
        ];
        correctURLs.map((item: string) => {
            it(item, () => {
                const result = _URL_REGEX.test(item);
                expect(result).to.be.false;
            });
        });
    });
});

describe("REGEX: URL_TO_HANDLEBARS_REGEX", () => {
    let _URL_REGEX: RegExp;

    beforeEach(() => {
        _URL_REGEX = new RegExp(URL_TO_HANDLEBARS_REGEX.source, URL_TO_HANDLEBARS_REGEX.flags);
    });

    describe("Accepts", () => {
        const correctURLs: Array<string> = [
            "https://www.example.com/swagger.handlebars",
            "http://www.example.com/swagger.handlebars",
            "http://www.example.com:3000/swagger.handlebars",
            "example.ae/swagger.handlebars",
            "localhost:3000/swagger.handlebars",
            "0.0.0.0:123123/swagger.handlebars",
            "127.12.21.3:3234/swagger.handlebars",
            "https://example.se/swagger/swagger.handlebars",
        ];
        correctURLs.map((item: string) => {
            it(item, () => {
                const result = _URL_REGEX.test(item);
                expect(result).to.be.true;
            });
        });
    });

    describe("Denies", () => {
        const correctURLs: Array<string> = [
            "https://example/swagger",
            "http://example/swagger",
            "http//swagger",
            "localhost:32423423423423/swagger",
            "https://example.se/swagger/swagger$%^&*()",
            "https://www.example.com/swagger",
            "example.ae/swagger",
            "localhost:3000/swagger",
        ];
        correctURLs.map((item: string) => {
            it(item, () => {
                const result = _URL_REGEX.test(item);
                expect(result).to.be.false;
            });
        });
    });
});

describe("REGEX: PATH_REGEX", () => {
    let _URL_REGEX: RegExp;

    beforeEach(() => {
        _URL_REGEX = new RegExp(PATH_REGEX.source, PATH_REGEX.flags);
    });

    describe("Accepts", () => {
        const correctURLs: Array<string> = [
            "src",
            "src/app/else",
            "./src",
            "../src"
        ];
        correctURLs.map((item: string) => {
            it(item, () => {
                const result = _URL_REGEX.test(item);
                expect(result).to.be.true;
            });
        });
    });

    describe("Denies", () => {
        const correctURLs: Array<string> = [
            "https://example/swagger",
            "example.ae/swagger",
            "localhost:3000/swagger",
        ];
        correctURLs.map((item: string) => {
            it(item, () => {
                const result = _URL_REGEX.test(item);
                expect(result).to.be.false;
            });
        });
    });
});

describe("REGEX: PATH_TO_JSON_REGEX", () => {
    let _URL_REGEX: RegExp;

    beforeEach(() => {
        _URL_REGEX = new RegExp(PATH_TO_JSON_REGEX.source, PATH_TO_JSON_REGEX.flags);
    });

    describe("Accepts", () => {
        const correctURLs: Array<string> = [
            "src/data.json",
            "src/app/else/data.json",
            "./src/data.json",
            "../src/data.json",
        ];
        correctURLs.map((item: string) => {
            it(item, () => {
                const result = _URL_REGEX.test(item);
                expect(result).to.be.true;
            });
        });
    });

    describe("Denies", () => {
        const correctURLs: Array<string> = [
            "src",
            "src/data",
            "src/data.js",
            "https://example/swagger.json",
            "example.ae/swagger.json",
            "localhost:3000/swagger.json",
        ];
        correctURLs.map((item: string) => {
            it(item, () => {
                const result = _URL_REGEX.test(item);
                expect(result).to.be.false;
            });
        });
    });
});

describe("REGEX: PATH_TO_HANDLEBARS_REGEX", () => {
    let _URL_REGEX: RegExp;

    beforeEach(() => {
        _URL_REGEX = new RegExp(PATH_TO_HANDLEBARS_REGEX.source, PATH_TO_HANDLEBARS_REGEX.flags);
    });

    describe("Accepts", () => {
        const correctURLs: Array<string> = [
            "src/data.handlebars",
            "src/app/else/data.handlebars",
            "./src/data.handlebars",
            "../src/data.handlebars",
        ];
        correctURLs.map((item: string) => {
            it(item, () => {
                const result = _URL_REGEX.test(item);
                expect(result).to.be.true;
            });
        });
    });

    describe("Denies", () => {
        const correctURLs: Array<string> = [
            "src",
            "src/data",
            "src/data.html",
            "https://example/swagger.handlebars",
            "example.ae/swagger.handlebars",
            "localhost:3000/swagger.handlebars",
        ];
        correctURLs.map((item: string) => {
            it(item, () => {
                const result = _URL_REGEX.test(item);
                expect(result).to.be.false;
            });
        });
    });
});

describe("REGEX: HANDLEBARS_TEMPLATE_REGEX", () => {
    let _URL_REGEX: RegExp;

    beforeEach(() => {
        _URL_REGEX = new RegExp(HANDLEBARS_TEMPLATE_REGEX.source, HANDLEBARS_TEMPLATE_REGEX.flags);
    });

    describe("Accepts", () => {
        const correctURLs: Array<string> = [
            "Hello {{user}}",
            "Hello {{#user}}",
            `
                interface {{name}} {
                    {{each items}}{{item}}{{/each}}
                }
            `,
        ];
        correctURLs.map((item: string) => {
            it(item, () => {
                const result = _URL_REGEX.test(item);
                expect(result).to.be.true;
            });
        });
    });

    describe("Denies", () => {
        const correctURLs: Array<string> = [
            "src",
            "hello {user}",
        ];
        correctURLs.map((item: string) => {
            it(item, () => {
                const result = _URL_REGEX.test(item);
                expect(result).to.be.false;
            });
        });
    });
});