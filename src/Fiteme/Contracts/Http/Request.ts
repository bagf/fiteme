
import {SessionInterface} from "../Session/SessionInterface";

export interface Request {
    attributes: Array<string>;
    request: Array<string>;
    query: Array<string>;
    server: Array<string>;
    files: Array<string>;
    cookies: Array<string>;
    headers: Array<string>;
    initialize();
    clone(): Request;
    get(key: string, _default?: string, deep?: boolean): string;
    getSession(): SessionInterface;
    hasPreviousSession(): boolean;
    hasSession(): boolean;
    // Shouldn't this an array of inet structs?
    getClientIps(): Array<string>;
    getClientIp(): string;
    getScriptName(): string;
    getPathInfo(): string;
    getBasePath(): string;
    getBaseUrl(): string;
    getScheme(): string;
    getPort(): number;
    getUser(): string;
    getPassword(): string;
    getUserInfo(): string;
    getHttpHost(): string;
    getRequestUri(): string;
    getSchemeAndHttpHost();
    getUri(): string;
    getUriForPath(path: string): string;
    getRelativeUriForPath(path: string): string;
    getQueryString(): string;
    isSecure(): boolean;
    getHost(): string;
    setMethod(method: string);
    getMethod(): string;
    getRealMethod(): string;
    getMimeType(format: string);
    getFormat(mimeType: string): Array<string>;
    getRequestFormat(_default?: string): string;
    setRequestFormat(locale: string);
    getLocale(): string;
    isMethod(method: string): boolean;
    isMethodSafe(): boolean;
    isMethodCacheable(): boolean;
    // Should be a buffer if we're being sane about things
    getContent(asResource: boolean): string;
    getEtags(): Array<string>;
    isNoCache(): boolean;
    getPreferredLanguage(locales?: Array<string>): string;
    getLanguages(): Array<string>;
    getCharsets(): Array<string>;
    getEncodings(): Array<string>;
    getAcceptableContentTypes(): Array<string>;
    isXmlHttpRequest(): boolean;
}