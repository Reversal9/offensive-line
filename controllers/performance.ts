import { Response, Request } from "express";
import { IPerformance } from "../types/performance";
import Performance from "../models/performance";
import mongoose from "mongoose";

export const getPerformances = async(req: Request, res: Response) => {
    try {
        const performances: IPerformance[] = await Performance.find();
        res.status(200).json({ performances });
    } catch(err) {
        console.error(err);
    }
};