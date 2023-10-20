import { Router } from "express";
import { getAthletes } from "../controllers/athletes";

const router: Router = Router();

router.get('/athletes', getAthletes);

export default router;