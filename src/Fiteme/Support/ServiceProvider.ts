
import {Application} from "../Contracts/Foundation/Application";
import {Container} from "../Contracts/Container/Container";
import {StringMap} from "./StringMap";
import * as fs from "fs";
import {Application as Artisan} from "../Contracts/Console/Application";

export abstract class ServiceProvider {
    protected app: Application & Container<any>;
    protected defer = false;
    protected static publishes: StringMap;
    protected static publishGroups: StringMap;

    constructor(app: Application & Container<any>) {
        this.app = app;
    }

    abstract register();

    protected mergeConfigFrom(ob: StringMap, key: string) {
        let config = <StringMap>this.app.make('config').get(key, new StringMap());

        this.app.make('config').set(key, new StringMap([...config, ...ob]))
    }

    protected loadViewsFrom(path: string, namespace: string) {
        let appPath = this.app.basePath() + "/resources/views/vendor/" + namespace;
        if (fs.existsSync(appPath)) {
            this.app.make('view').addNamespace(namespace, appPath);
        }

        this.app.make('view').addNamespace(namespace, path);
    }

    protected loadTranslationsFrom(ob: StringMap, namespace: string) {
        this.app.make('translator').addNamespace(namespace, ob);
    }

    protected publishes(ob: StringMap, group?: string) {
        let className = this.constructor.name;
        let staticRef = <typeof ServiceProvider>this.constructor;

        // Late static binding is real verbose? must be a better way
        if (!staticRef.publishes.has(className)) {
            staticRef.publishes.set(className, new StringMap());
        }

        let existing = <StringMap> staticRef.publishes.get(className);
        staticRef.publishes.set(className, new StringMap([...existing, ...ob]));

        if (group) {
            if (!staticRef.publishGroups.has(group)) {
                staticRef.publishGroups.set(group, new StringMap());
            }

            let existingGroup = <StringMap> staticRef.publishGroups.get(group);
            staticRef.publishes.set(group, new StringMap([...existingGroup, ...ob]));
        }
    }

    static pathsToPublish(provider?: string, group?: string): Iterable<string> {
        if (provider && group) {
            let providerMap = <StringMap>ServiceProvider.publishes.get(provider);
            let groupMap = <StringMap>ServiceProvider.publishGroups.get(group);

            if (providerMap instanceof StringMap && groupMap instanceof StringMap) {
                if (!providerMap.size || !groupMap.size) {
                    return [];
                }

                return <Iterable<string>>(providerMap.intersect(groupMap).values());
            }

        }

        if (group && ServiceProvider.publishGroups.get(group) instanceof StringMap) {
            return <Iterable<string>>ServiceProvider.publishGroups.get(group);
        }

        if (provider && ServiceProvider.publishes.get(provider) instanceof StringMap) {
            return <Iterable<string>>(<StringMap>ServiceProvider.publishes.get(provider)).values();
        }

        if (group || provider) {
            return [];
        }

        let paths = new Set<string>();

        ServiceProvider.publishes.forEach((value, key, map) => {
            if (value instanceof StringMap) {
                value.forEach((value2, key2, map2) => (paths.has(value2.toString()))?null:paths.add(value2.toString()));
            }
        });

        return paths;
    }

    static compiles(): Array<string> {
        return [];
    }

    commands(commands: Array<string>) {
        let events = this.app.make('events');

        events.listen('artisan.start', (artisan: Artisan) => {
            artisan.resolveCommands(commands);
        });
    }

    provides(): Array<string> {
        return [];
    }

    when(): Array<string> {
        return [];
    }

    isDeferred(): Array<string> {
        return [];
    }
}
