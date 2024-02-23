import express, { Router } from "express";


const router: Router = Router();

router.get('/login', (req, res) => {
    res.render('login.ejs');
});
export default router;