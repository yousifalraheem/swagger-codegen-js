export const URL_REGEX: RegExp = /^(?:https?\:\/\/)?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|localhost)|([-a-z0-9@:%._\+~#=]{1,256}\.[a-z0-9()]{1,6}))(\:\d{1,6})?\b\/([-a-z0-9()@:%_\+.~#?&//=]*)(\?[-a-z0-9()@:%_\+.~#?&//=]*)?$/ig;
export const URL_TO_JSON_REGEX: RegExp = /^(?:https?\:\/\/)?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|localhost)|([-a-z0-9@:%._\+~#=]{1,256}\.[a-z0-9()]{1,6}))(\:\d{1,6})?\b\/([-a-z0-9()@:%_\+.~#?&//=]*)(\.json)(\?[-a-z0-9()@:%_\+.~#?&//=]*)?$/ig;
export const URL_TO_HANDLEBARS_REGEX: RegExp = /^(?:https?\:\/\/)?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|localhost)|([-a-z0-9@:%._\+~#=]{1,256}\.[a-z0-9()]{1,6}))(\:\d{1,6})?\b\/([-a-z0-9()@:%_\+.~#?&//=]*)(\.handlebars)(\?[-a-z0-9()@:%_\+.~#?&//=]*)?$/ig;
export const PATH_REGEX: RegExp = /^(\.||\.\.)?([a-z\-\_\/])+$/ig;
export const PATH_TO_JSON_REGEX: RegExp = /^(\.||\.\.)?([a-z\-\_\/])+(\.json)$/ig;
export const PATH_TO_HANDLEBARS_REGEX: RegExp = /^(\.||\.\.)?([a-z\-\_\/])+(\.handlebars)$/ig;
export const HANDLEBARS_TEMPLATE_REGEX: RegExp = /(\{\{)(.+)(\}\})/igm;