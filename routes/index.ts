import { Router } from "express";
import athleteRoutes from "./athleteRoutes";
import statisticRoutes from "./statisticRoutes";
import coachRoutes from "./coachRoutes";
import formRoutes from "./formRoutes";

const router: Router = Router();

router.use(athleteRoutes);
router.use(statisticRoutes);
router.use(coachRoutes);
router.use(formRoutes);

export default router;
