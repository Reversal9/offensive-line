import { IAthlete } from "../types/athlete";
import { model, Schema } from "mongoose";

const athleteSchema: Schema = new Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

export default model<IAthlete>("Athlete", athleteSchema);