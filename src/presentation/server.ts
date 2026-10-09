import express from 'express';
import path from 'path';

interface Options {
    PORT: number;
    PUBLIC_PATH?: string;
}

export class Server {

    private app = express();
    private readonly PORT: number;
    private readonly PUBLIC_PATH: string

    constructor(options: Options) {
        this.PORT = options.PORT;
        this.PUBLIC_PATH = options.PUBLIC_PATH || 'public';
    }

    async start() {
        //Middlewares

        //Public folders

        this.app.use(express.static(this.PUBLIC_PATH));

        this.app.get('/{*splat}', (req, res) => {
            const indexPath = path.join(__dirname, `../../../${this.PUBLIC_PATH}/index.html`);
            res.sendFile(indexPath);
        })

        this.app.listen(3000, () => {




            console.log('Server running on port 3000')
        })
    }
}