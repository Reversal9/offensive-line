import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import routes from "./routes";
import bcrypt from 'bcrypt';
import path from 'path';
import passport from 'passport';
import flash from 'express-flash';
import session from 'express-session';
import methodOverride from 'method-override';
const initializePassport: any = require('../passport-config');
import crypto from 'crypto';

import {getAthleteById, getAthletes, getAthletesAsCoach} from "./controllers/athletes";
import {editStatistic} from "./controllers/statistics";
import {updateStatistic} from "./controllers/statistics";
import {addStatistic, getStatistic, getStatistics} from "./controllers/statistics";




const app: Express = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.urlencoded({extended: false}));

app.use(express.json());
app.use(routes);

const users: any[] = [];

initializePassport(
    passport, 
    (email:string) => users.find(user => user.email === email),
    (id:string) => users.find(user => user.id === id)
);

const secret = crypto.randomBytes(64).toString('hex');


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
        console.log(req.body.email + " " + req.body.password)
        console.log("Is same: " + await bcrypt.compare(req.body.password, hashedPassword))

        users.push(user);
        res.redirect('/login');
        console.log("Successfully created user")
        console.log(user.email + " " + user.password)
    } catch {
        res.redirect('/register');
    }
});

/*
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/athletes',
    failureRedirect: '/login',
    failureFlash: true,
    failureMessage: true
}));
*/

app.post('/login',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/poop' }),
  function (req, res) {
    console.log('req user', req.body);
    console.log('after auth', req.user);
  }
);

app.get('/', checkAuthenticated, (req, res) => {
    res.redirect('/athletes');
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



app.get('/athletes', checkAuthenticated, getAthletes);
app.get('/athletes/:id', checkAuthenticated, (req, res) => {
    getAthleteById(req, res, req.params.id);
});

app.get('/coach', checkAuthenticated, (req, res) => {
    getAthletesAsCoach(req, res);
});

app.get('/form', checkAuthenticated, (req, res) => {
    console.log("we meesssed up")
    res.render('forms-view.ejs')
});

app.get('/statistics', checkAuthenticated, getStatistics);

app.get('/statistics/:id', checkAuthenticated, getStatistic);

app.post('/statistics', checkAuthenticated, addStatistic);

app.put('/statistics/:id', checkAuthenticated, updateStatistic);


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
        console.log("Authenticated")

        return res.redirect('/');
    }
    next();
}

 function checkAuthenticated(req:Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        console.log("ur nut")
        return next();

    } else {
        console.log("deez nut")
    }

    res.redirect('/login');
    console.log("Not Authenticated")

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

