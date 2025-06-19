import express, { Express } from 'express';
import cors from 'cors';
import hbs from 'hbs';
import path from 'path';
import pages from '../routes/pages';

class Server {
    private app:Express;
    private port:string | number;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.middlewares();
        this.hbs();
        this.routes();
    }

    private middlewares():void {
        const allowedOrigins:string[] = [`http://localhost:${this.port}`];
        
        if (process.env.URL_SERVER) {
            allowedOrigins.push(process.env.URL_SERVER);
        }

        const corsOptions = {
            origin: function(origin:string|undefined, callback:Function) {
                if(!origin) return callback(null, true);

                if (allowedOrigins.indexOf(origin) === -1) {
                    const msg:string = 'The CORS policy for this site does not allow access from the specified Origin.';
                    return callback(new Error(msg), false);
                }

                return callback(null, true);
            }
        };

        this.app.use(cors(corsOptions));
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(express.urlencoded({ extended: true }));
    }

    private hbs():void {
        this.app.set('view engine', 'hbs');
        hbs.registerPartials(path.join(__dirname, '../../views/partials'));

        hbs.registerHelper('ifEquals', function(this:any, arg1:any, arg2:any, options:any) {
            return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
        });
    }

    private routes():void {
        this.app.use(pages);
    }

    public listen():void {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

export default Server;