import { Document } from "mongoose";

export interface IAthlete extends Document {
    _id: string,
    first_name: string,
    last_name: string
}