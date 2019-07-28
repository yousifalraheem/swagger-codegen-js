"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URL_REGEX = /^(?:https?\:\/\/)?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|localhost)|([-a-z0-9@:%._\+~#=]{1,256}\.[a-z0-9()]{1,6}))(\:\d{1,6})?\b\/([-a-z0-9()@:%_\+.~#?&//=]*)(\?[-a-z0-9()@:%_\+.~#?&//=]*)?$/ig;
exports.URL_TO_JSON_REGEX = /^(?:https?\:\/\/)?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|localhost)|([-a-z0-9@:%._\+~#=]{1,256}\.[a-z0-9()]{1,6}))(\:\d{1,6})?\b\/([-a-z0-9()@:%_\+.~#?&//=]*)(\.json)(\?[-a-z0-9()@:%_\+.~#?&//=]*)?$/ig;
exports.URL_TO_HANDLEBARS_REGEX = /^(?:https?\:\/\/)?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|localhost)|([-a-z0-9@:%._\+~#=]{1,256}\.[a-z0-9()]{1,6}))(\:\d{1,6})?\b\/([-a-z0-9()@:%_\+.~#?&//=]*)(\.handlebars)(\?[-a-z0-9()@:%_\+.~#?&//=]*)?$/ig;
exports.PATH_REGEX = /^([a-z\.\-\_\/])+$/ig;
exports.PATH_TO_JSON_REGEX = /^([a-z\.\-\_\/])+(\.json)$/ig;
exports.PATH_TO_HANDLEBARS_REGEX = /^([a-z\.\-\_\/])+(\.handlebars)$/ig;
exports.HANDLEBARS_TEMPLATE_REGEX = /(\{\{)([a-z]+)(\}\})/ig;
//# sourceMappingURL=constants.js.map