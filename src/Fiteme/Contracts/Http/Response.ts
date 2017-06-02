
import {Request} from "./Request";

export interface Response {
    // Should be ResponseHeaderBag
    headers: Array<[string, string]>;
    clone(): Response;
    prepare(request: Request);
    sendHeaders(): Response;
    sendContent(): Response;
    send(): Response;
    setContent(content: string): Response;
    getContent(): string;
    setProtocolVersion(version: string): Response;
    getProtocolVersion(): string;
    setStatusCode(code: number, test?: string): Response;
    getStatusCode(): number;
    setCharset(charset: string): Response;
    getCharset(): string;
    isCacheable(): boolean;
    isFresh(): boolean;
    isValidateable(): boolean;
    setPrivate(): Response;
    setPublic(): Response;
    mustRevalidate(): boolean;
    getDate(): Date;
    setDate(date: Date): Response;
    getAge(): number;
    expire(): Response;
    getExpires(): Date;
    setExpires(date?: Date): Response;
    getMaxAge(): number;
    setMaxAge(value: number): Response;
    setSharedMaxAge(value: number): Response;
    getTtl(): number;
    setTtl(seconds: number): Response;
    setClientTtl(seconds: number): Response;
    getLastModified(): Date;
    setLastModified(date: Date): Response;
    getEtag(): string;
    setEtag(etag?: string, weak?: boolean): Response;
    setCache(options: Array<[string, string]>): Response;
    setNotModified(): Response;
    hasVary(): boolean;
    getVary(): Array<string>;
    setVary(headers: Array<string>, replace: boolean): Response;
    isNotModified(request: Request): boolean;
    isInvalid(): boolean;
    isInformational(): boolean;
    isSuccessful(): boolean;
    isRedirection(): boolean;
    isClientError(): boolean;
    isServerError(): boolean;
    isOk(): boolean;
    isForbidden(): boolean;
    isNotFound(): boolean;
    isRedirect(location?: string): boolean;
    isEmpty(): boolean;
}
