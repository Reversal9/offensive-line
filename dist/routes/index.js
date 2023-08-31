"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
router.get('/', function (req, res) {
    res.render('student-view.ejs');
});
exports.default = router;
//# sourceMappingURL=index.js.map