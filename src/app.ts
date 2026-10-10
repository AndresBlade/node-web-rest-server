import { Server } from "./presentation/server.js"
import { envs } from './config/envs.js';
import { AppRoutes } from "./presentation/routes.js";

(() => {
    main()
})()

function main() {
    const server = new Server({ PORT: envs.PORT, PUBLIC_PATH: envs.PUBLIC_PATH, routes: AppRoutes.routes });

    server.start();
}