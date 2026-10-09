import { Server } from "./presentation/server.js"
import { envs } from './config/envs.js';

(() => {
    main()
})()

function main() {
    const server = new Server({ PORT: envs.PORT, PUBLIC_PATH: envs.PUBLIC_PATH });

    server.start();
}