export const URL_REGEX: RegExp = /^(?:https?\:\/\/)?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|localhost)|([-a-z0-9@:%._\+~#=]{1,256}\.[a-z0-9()]{1,6}))(\:\d{1,6})?\b\/([-a-z0-9()@:%_\+.~#?&//=]*)(\.json)(\?[-a-z0-9()@:%_\+.~#?&//=]*)?$/ig;
export const PATH_REGEX: RegExp = /(\\\\?([^\\/]*[\\/])*)([^\\/]+)\.json$/igm;