import { Response, Request } from "express";
import { IStatistic } from "../types/statistic";
import Statistic from "../models/statistic";
import mongoose from "mongoose";

export const getStatistics = async(req: Request, res: Response) => {
    try {
        const statistics: IStatistic[] = await Statistic.find();
        res.status(200).json({ statistics });
    } catch(err) {
        console.error(err);
    }
};