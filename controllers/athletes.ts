import { Response, Request } from "express";
import { IAthlete } from "../types/athlete";
import Athlete from "../models/athlete";
import mongoose from "mongoose";
import {IStatistic} from "../types/statistic";
import Statistic from "../models/statistic";
import { table } from "console";

export const getAthletes = async(req: Request, res: Response) => {
    try {
        const athletes: IAthlete[] = await Athlete.find();
        res.status(200).json({ athletes });
    } catch(err) {
        console.error(err);
    }
};

export const getAthletesAsCoach = async(req: Request, res: Response) => {
    try {
        let athletes: IAthlete[] = await Athlete.find();
        let coachAthleteData = new Array(athletes.length);
        for (let i = 0; i < athletes.length; i++) {
            let statistics: IStatistic[] | null = await Statistic.find({athlete_id: new mongoose.Types.ObjectId(athletes[i]._id)});
            statistics?.sort((a: IStatistic, b: IStatistic): number => {
                const year_a: number = parseInt(a.year?.split("-")[0] ?? "-1");
                const year_b: number = parseInt(b.year?.split("-")[0] ?? "-1");
                if (year_a > year_b) {
                    return 1;
                } else if (year_b > year_a) {
                    return -1;
                }
    
                const shift: 5 = 5;
    
                const month_a: number = ((a.month ?? -1) + shift) % 12;
                const month_b: number = ((b.month ?? -1) + shift) % 12;
    
                if (month_a >= month_b) {
                    return 1;
                } else if (month_b > month_a) {
                    return -1;
                }
    
                return 0;
            });

            let tableOrderStats = new Array(12);
            if (statistics.length == 12) { tableOrderStats = statistics }
            else {
                statistics.forEach(stat => {
                    let a = 0;
                    if (stat.month != undefined && stat.month >= 7) { a = 0; }
                    else if (stat.month != undefined && stat.month <= 4) { a = 1; }
                    else if (stat.month != undefined && stat.month >= 5) { a = 2; }
                    if (stat.grade != undefined) {
                        tableOrderStats[((stat.grade - 9) * 3) + a] = stat;
                    }
                });
                for (let i = 0; i < 12; i++) {
                    if (tableOrderStats[i] == null) {
                        tableOrderStats[i] = {};
                    }
                }
            }

            coachAthleteData[i] = {
                athletes: athletes[i], 
                statistics: tableOrderStats
            }
        }

        res.render('coach-view.ejs', {
            coachAthleteData: coachAthleteData,
        })
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

            const shift: 5 = 5;

            const month_a: number = ((a.month ?? -1) + shift) % 12;
            const month_b: number = ((b.month ?? -1) + shift) % 12;

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

        let tableOrderStats = new Array(12);
        if (statistics.length == 12) { tableOrderStats = statistics }
        else {
            statistics.forEach(stat => {
                let a = 0;
                if (stat.month != undefined && stat.month >= 7) { a = 0; }
                else if (stat.month != undefined && stat.month <= 4) { a = 1; }
                else if (stat.month != undefined && stat.month >= 5) { a = 2; }
                if (stat.grade != undefined) {
                    tableOrderStats[((stat.grade - 9) * 3) + a] = stat;
                }
            });
            for (let i = 0; i < 12; i++) {
                if (tableOrderStats[i] == null) {
                    tableOrderStats[i] = {};
                }
            }
        }
        res.render('student-view.ejs', {
            athlete: athlete,
            statistics: statistics,
            tableOrderStats: tableOrderStats
        });
    } catch(err) {
        console.error(err);
    }
};