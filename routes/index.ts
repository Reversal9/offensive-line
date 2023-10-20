import { Router } from "express";
import athleteRoutes from "./athleteRoutes";
import statisticRoutes from "./statisticRoutes";

const router: Router = Router();

router.use(athleteRoutes);
router.use(statisticRoutes);

router.get('/', (req, res) => {
    res.render('student-view.ejs');
});

export default router;