import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import routes from "./routes";
import bcrypt from 'bcrypt';
import path from 'path';
import passport from 'passport';
import flash from 'express-flash';
import session from 'express-session';
import methodOverride from 'method-override';
const initializePassport: any = require('./passport.config');
import crypto from 'crypto';

const app: Express = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.json());
app.use(express.urlencoded());
app.use(routes);

const users: any[] = [];

initializePassport(
    passport, 
    (email:string) => users.find(user => user.email === email),
    (id:string) => users.find(user => user.id === id)
);

const secret = crypto.randomBytes(64).toString('hex');

app.use(express.static("public"));
app.set("views", path.join(__dirname, "./views"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use(flash());
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs');
});

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs');
});

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {id: Date.now().toString(), email: req.body.email, password: hashedPassword};
        users.push(user);
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/', checkAuthenticated, (req, res) => {
    res.render('homepage.ejs');
});

app.delete('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) {
            console.error("Error during logout:", err);
            return next(err);
        }
        res.redirect('/login');
    });
});

declare global {
    namespace Express {
        interface Request {
            isAuthenticated(): boolean;
        }
    }
}

// Define custom type declaration for redirect method
declare global {
    namespace Express {
        interface Response {
            redirect(path: string): Response;
        }
    }
}

function checkNotAuthenticated(req:Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

function checkAuthenticated(req:Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

const PORT: string | number = process.env.PORT || 5000;

const uri: string = `mongodb://10.195.15.173:19132/offensive-line`;

mongoose
    .connect(uri)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch(error => {
        throw error
    });

