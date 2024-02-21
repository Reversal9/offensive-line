import express, { Router } from "express";
import {editStatistic} from "../controllers/statistics";
import {updateStatistic} from "../controllers/statistics";

const router: Router = Router();

router.get('/form', (req, res) => {
    console.log("we meesssed up")
    res.render('forms-view.ejs')
});


router.get('/form/:id', editStatistic);

router.post('/form/editform', updateStatistic);




export default router;
