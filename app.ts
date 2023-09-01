import express, { Express } from "express";
import mongoose from "mongoose";
import routes from "./routes";
import path from "path";

const app: Express = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(routes);

const PORT: string | number = process.env.PORT || 5000;

const uri: string = `mongodb://127.0.0.1:27017`;

app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
)

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
