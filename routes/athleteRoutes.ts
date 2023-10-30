import express, { Router } from "express";
import {getAthleteById, getAthletes} from "../controllers/athletes";

const router: Router = Router();

router.get('/athletes', getAthletes);
router.get('/athletes/:id', (req, res) => {
    getAthleteById(req, res, req.params.id);
});

export default router;