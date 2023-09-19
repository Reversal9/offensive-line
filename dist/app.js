"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "../views"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use(express_1.default.static("public"));
app.use(routes_1.default);
var PORT = process.env.PORT || 5000;
var uri = "mongodb://127.0.0.1:27017";
app.listen(PORT, function () {
    return console.log("Server running on http://localhost:".concat(PORT));
});
// mongoose
//     .connect(uri)
//     .then(() =>
//         app.listen(PORT, () =>
//             console.log(`Server running on http://localhost:${PORT}`)
//         )
//     )
//     .catch(error => {
//         throw error
//     });
//# sourceMappingURL=app.js.map