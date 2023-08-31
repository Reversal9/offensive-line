import { Router } from "express";

const router: Router = Router();

router.get('/', (req, res) => {
    res.render('student-view.ejs');
});

router.get('/user/:id', (req, res) => {
    const { id } = req.params;
    // do all the databasing and fetch all information related to this id
    // then render student-view given information
})

export default router;