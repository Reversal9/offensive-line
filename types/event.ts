import { Document } from "mongoose";

export interface IEvent extends Document {
    _id: string,
    score: string,
    athlete_id: string
}
