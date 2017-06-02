
import {Request} from "./Request";
import {Response} from "./Response";

export interface Kernel {
    bootstrap();
    terminate(request: Request, response: Response);
    getApplication();
}
