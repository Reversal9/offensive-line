import { Response, Request } from "express";
import { IEvent } from "../types/event";
import Event from "../models/event";
import mongoose from "mongoose";

export const getEvents = async(req: Request, res: Response) => {
    try {
        const events: IEvent[] = await Event.find();
        res.status(200).json({ events });
    } catch(err) {
        console.error(err);
    }
};