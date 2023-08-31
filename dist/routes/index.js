"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
router.get('/', function (req, res) {
    res.render('student-view.ejs');
});
router.get('/user/:id', function (req, res) {
    var id = req.params.id;
    // do all the databasing and fetch all information related to this id
    // then render student-view given information
});
exports.default = router;
//# sourceMappingURL=index.js.map