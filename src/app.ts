import { Server } from "./presentation/http/server.ts"
import { envs } from './config/envs.ts';
import { AppRoutes } from "./presentation/http/router.ts";
import { db } from './prisma/db.ts';

(() => {
    main()
})()

async function main() {
    await db.connect();
    const server = new Server({ PORT: envs.PORT, PUBLIC_PATH: envs.PUBLIC_PATH, routes: AppRoutes.routes });
    server.start();
}