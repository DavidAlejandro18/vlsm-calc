const express = require('express');
const cors = require('cors');
const hbs = require('hbs');
const path = require('path');
const session = require('express-session');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.secret = process.env.SECRET_SESSION

        this.middlewares();

        this.hbs();

        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(session({
            secret: this.secret,
            resave: false,
            saveUninitialized: true
        }));
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