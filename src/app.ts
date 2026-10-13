import { Server } from "./presentation/server.ts"
import { envs } from './config/envs.ts';
import { AppRoutes } from "./presentation/routes.ts";

(() => {
    main()
})()

function main() {
    const server = new Server({ PORT: envs.PORT, PUBLIC_PATH: envs.PUBLIC_PATH, routes: AppRoutes.routes });

    server.start();
}