import { IEvent } from "../types/event";
import { model, Schema } from "mongoose";

const eventSchema: Schema = new Schema(
    {
        score: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default model<IEvent>("Event", eventSchema);
