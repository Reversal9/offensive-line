import { Router } from "express";

const router: Router = Router();

router.get('/', (req, res) => {
    res.render('student-view.ejs');
})

export default router;