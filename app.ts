// if(process.env.NODE_ENV !== 'production')
// {
//     require('dotenv').config();
// }

import 'dotenv/config';

import express, { Express } from "express";
import mongoose from "mongoose";
import routes from "./routes";
import path from "path";
import passport from "passport";
const flash = require('express-flash');
const session = require('express-session')


const app: Express = express();

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())



app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(routes);

const PORT: string | number = process.env.PORT || 5000;

const uri: string = `mongodb://10.195.15.173:19132/offensive-line` || process.env.MONGODB_URL;

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
