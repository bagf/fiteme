
import {Command} from "./Command/Command";

export interface Application {
    call(command: string, parameters: Array<string>): number;
    output(): string;
    resolve(command: string): Command;
    resolveCommands(commands: Array<string>): Application;
}
