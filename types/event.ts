import { Document } from "mongoose";

export interface IEvent extends Document {
    _id: string,
    score: number,
    athlete_id: string
}
