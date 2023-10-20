"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var athleteRoutes_1 = __importDefault(require("./athleteRoutes"));
var statisticRoutes_1 = __importDefault(require("./statisticRoutes"));
var router = (0, express_1.Router)();
router.use(athleteRoutes_1.default);
router.use(statisticRoutes_1.default);
router.get('/', function (req, res) {
    res.render('student-view.ejs');
});
exports.default = router;
//# sourceMappingURL=index.js.map