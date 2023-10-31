import { Response, Request } from "express";
import { IAthlete } from "../types/athlete";
import Athlete from "../models/athlete";
import mongoose from "mongoose";
import {IStatistic} from "../types/statistic";
import Statistic from "../models/statistic";

export const getAthletes = async(req: Request, res: Response) => {
    try {
        const athletes: IAthlete[] = await Athlete.find();
        res.status(200).json({ athletes });
    } catch(err) {
        console.error(err);
    }
};

export const getAthleteById = async(req: Request, res: Response, id: string) => {
    try {
        const athlete: IAthlete | null = await Athlete.findById({_id: id});
        const statistics: IStatistic[] | null = await Statistic.find({athlete_id: new mongoose.Types.ObjectId(id)});
        statistics?.sort((a: IStatistic, b: IStatistic): number => {
            const year_a: number = parseInt(a.year?.split("-")[0] ?? "-1");
            const year_b: number = parseInt(b.year?.split("-")[0] ?? "-1");
            if (year_a > year_b) {
                return 1;
            } else if (year_b > year_a) {
                return -1;
            }

            const month_a: number = a.month ?? -1;
            const month_b: number = b.month ?? -1;

            if (month_a >= month_b) {
                return 1;
            } else if (month_b > month_a) {
                return -1;
            }

            return 0;
        });

        for (const a of statistics) {
            console.log(a.year + " " + a.month)
        }

        res.render('student-view.ejs', {
            athlete: athlete,
            statistics: statistics
        });
    } catch(err) {
        console.error(err);
    }
};