
/*
import express, { Router } from "express";
import {addUser} from "../controllers/user";

const bcrypt = require('bcrypt');

type User = {
    id: string,
    username: any,
    password: any
}

var users: User[] =  []

const router: Router = Router();

const passport = require('passport')
const initializePassport = require('./passport-config')
 initializePassport(
  passport,
  (username: string) =>  users.find((user: User) => user.username === username),
 
)


router.get('/register', (req, res) => {
    res.render('register.ejs');
});

router.post('/register', (req, res) =>
{
    try{
        const hashedPassword = bcrypt.hash(req.body.password,10)
        users.push({
            id: Date.now().toString(),
            username: req.body.username,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch{
        res.redirect('/register')
    }

    console.log(users)
})

export default router;

*/
