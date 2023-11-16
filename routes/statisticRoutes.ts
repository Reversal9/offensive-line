import { Router } from "express";
import {addStatistic, getStatistic, getStatistics, updateStatistic} from "../controllers/statistics";

const router: Router = Router();

router.get('/statistics', getStatistics);

router.get('/statistics/:id', getStatistic);

router.post('/statistics', addStatistic);

router.put('/statistics/:id', updateStatistic);


export default router;