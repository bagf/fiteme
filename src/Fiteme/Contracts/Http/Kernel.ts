
import {Request} from "./Request";
import {Response} from "./Response";

export interface Kernel {
    bootstrap();
    handle(request: Request): Response;
    terminate(request: Request, response: Response);
    getApplication();
}
