import { IPerformance } from "../types/performance";
import { model, Schema } from "mongoose";

const performanceSchema: Schema = new Schema(
    {
        athlete_id: {
            type: String,
            required: true
        },
        event_id: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default model<IPerformance>("Performance", performanceSchema);