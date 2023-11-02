import { Document } from "mongoose";

export interface IPerformance extends Document {
    _id: string,
    athlete_id: string,
    event_id: string,
    score: number
}