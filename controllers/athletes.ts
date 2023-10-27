import { Response, Request } from "express";
import { IAthlete } from "../types/athlete";
import Athlete from "../models/athlete";
import mongoose from "mongoose";
import {IStatistic} from "../types/statistic";
import Statistic from "../models/statistic";

export const getAthletes = async(req: Request, res: Response) => {
    try {
        const athletes: IAthlete[] = await Athlete.find();
        console.log(athletes);
        res.status(200).json({ athletes });
    } catch(err) {
        console.error(err);
    }
};

export const getAthleteById = async(req: Request, res: Response, id: string) => {
    try {
        const athlete: IAthlete | null = await Athlete.findById({_id: id});
        const statistics: IStatistic[] | null = await Statistic.find({athlete_id: new mongoose.Types.ObjectId(id)});
        console.log(statistics);
        res.render('student-view.ejs', {
            athlete: athlete,
            statistics: statistics
        });
    } catch(err) {
        console.error(err);
    }
};