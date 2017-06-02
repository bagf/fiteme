
import {ContextualBindingBuilder} from "./ContextualBindingBuilder";
import {StringMap} from "../../Support/StringMap";

export interface Container<T> {
    bound(abstract: string): boolean;
    alias(abstract: string, alias: string);
    tag(abstract: string, tags: Array<string>);
    tagged(tag: string): Array<T>;
    bind(abstract: string, concrete?: Function|string, shared?: boolean);
    bindIf(abstract: string, concrete?: Function|string, shared?: boolean);
    singleton(abstract: string, concrete?: Function|string);
    extend(abstract: string, closure: Function);
    instance(abstract: string, instance: T);
    when(concrete: string): ContextualBindingBuilder;
    make(abstract: string, parameters?: StringMap);
    call(callback: Function, parameters?: StringMap);
    resolved(abstract: string);
    resolving(abstract: string, callback?: (object: T, container: Container<T>) => void);
    afterResolving(abstract: string, callback?: (object: T, container: Container<T>) => void);
}
