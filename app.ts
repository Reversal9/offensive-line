import express, { Express } from "express";
import mongoose from "mongoose";
import routes from "./routes";
import path from "path";

const app: Express = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.json());
app.use(express.urlencoded());
app.use(routes);

const PORT: string | number = process.env.PORT || 5000;

const uri: string = `mongodb://10.195.16.33:27017/offensive-line`;

mongoose
    .connect(uri)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch(error => {
        throw error
    });
