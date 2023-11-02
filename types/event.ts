import { Document } from "mongoose";

export interface IEvent extends Document {
    _id: string,
    event_name: string
}