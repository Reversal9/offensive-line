import { Router } from "express";
import athleteRoutes from "./athleteRoutes";
import statisticRoutes from "./statisticRoutes";
import coachRoutes from "./coachRoutes";

const router: Router = Router();

router.use(athleteRoutes);
router.use(statisticRoutes);
router.use(coachRoutes);

export default router;