import express, { Router } from "express";
import {getAthletesAsCoach} from "../controllers/athletes";

const router: Router = Router();

router.get('/coach', (req, res) => {
    getAthletesAsCoach(req, res);
});
export default router;