const express = require('express');
const cors = require('cors');
const hbs = require('hbs');
const path = require('path');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.middlewares();

        this.hbs();

        this.routes();
    }

    middlewares() {
        const allowedOrigins = [`http://localhost:${this.port}`];

        if (process.env.URL_SERVER) {
            allowedOrigins.push(process.env.URL_SERVER);
        }

        const corsOptions = {
            origin: function(origin, callback) {
                if (!origin) return callback(null, true);
                
                if (allowedOrigins.indexOf(origin) === -1) {
                    let msg = 'The CORS policy for this site does not allow access from the specified Origin.';
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

    hbs() {
        this.app.set('view engine', 'hbs');
        hbs.registerPartials(path.join(__dirname, "../", "/views/partials"));

        hbs.registerHelper({
            ifEquals: function(arg1, arg2, options) {
                return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
            },
            json: function(value) {
                return JSON.stringify(value);
            },
            times: function(n, block) {
                var accum = '';
                for (var i = 0; i < n; ++i)
                    accum += block.fn(i);
                return accum;
            },
            and: function(a, b) {
                return a && b;
            },
            or: function(a, b) {
                return a || b;
            },
        });
    }

    routes() {
        this.app.use(require('../routes/pages'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

module.exports = Server;