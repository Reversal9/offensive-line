import express, { Router } from "express";
import {addUser} from "../controllers/user";



const router: Router = Router();

router.get('/register', (req, res) => {
    res.render('register.ejs');
});

router.post('/register',addUser )

export default router;