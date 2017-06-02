
import {ServiceProvider} from "../../Support/ServiceProvider";

export interface Application {
    version(): string;
    basePath(): string;
    environment(env: Array<string>|string): string|boolean;
    isDownForMaintenance(): boolean;
    registerConfiguredProviders();
    register(provider: string|ServiceProvider, options?: Array<[string, string]>, force?: boolean): ServiceProvider;
    registerDeferredProvider(provider: string, service?: string);
    boot();
    booting(callback: Function);
    booted(callback: Function);
    getCachedCompilePath(): string;
    getCachedServicesPath(): string;
}