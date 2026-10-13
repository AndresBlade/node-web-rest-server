import express, { Router } from 'express';
import path from 'path';
import { db } from '../prisma/db.ts';

interface Options {
    PORT: number;
    PUBLIC_PATH?: string;
    routes: Router
}

export class Server {

    private app = express();
    private readonly PORT: number;
    private readonly PUBLIC_PATH: string
    private readonly routes: Router;

    constructor(options: Options) {
        this.PORT = options.PORT;
        this.PUBLIC_PATH = options.PUBLIC_PATH || 'public';
        this.routes = options.routes;
    }

    async start() {
        //Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        //Routes
        this.app.use(this.routes)

        await db.connect();

        this.app.listen(this.PORT, () => {
            console.log(`Server running on port ${this.PORT}`)
        })
    }
}