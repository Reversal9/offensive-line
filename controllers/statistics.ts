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

export const getStatistic = async(req: Request, res: Response) => {
    try {
        const statistic: IStatistic[] | null = await Statistic.findOne(
            {_id: req.params.id }
        );
        res.status(200).json({ statistic });
    } catch(err) {
        console.error(err);
    }
};

export const addStatistic = async(req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body;
        const statistic: IStatistic = new Statistic({
            month: body?.month,
            year: body?.year,
            position: body?.position,
            grade: body?.grade,
            height: body?.height,
            weight: body?.weight,
            squat: body?.squat,
            bench: body?.bench,
            clean: body?.clean,
            bench_squat: body?.bench_squat,
            total: body?.total,
            jump: body?.jump,
            reach: body?.reach,
            vertical: body?.vertical,
            forty_a: body?.forty_a,
            forty_b: body?.forty_b,
            forty_average: body?.forty_average,
            laser_forty: body?.laser_forty,
            pro_a: body?.pro_a,
            pro_b: body?.pro_b,
            pro_average: body?.pro_average,
            group: body?.group,
            zero_to_ten: body?.zero_to_ten,
            ten_to_twenty: body?.ten_to_twenty,
            twenty_to_thirty: body?.twenty_to_thirty,
            thirty_to_forty: body?.thirty_to_forty,
            elite: body?.elite,
            player_height_score: body?.player_height_score,
            active: body?.active,
            athlete_id: body.athlete_id
        });
        const newStatistic: IStatistic = await statistic.save();
        const allStatistics: IStatistic[] = await Statistic.find();
        res.status(201).json({
            message: "Member added",
            statistic: newStatistic,
            statistics: allStatistics
        });
    } catch(err) {
        throw err;
    }
};

export const updateStatistic = async(req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body
        } = req;
        const updatedStatistic: IStatistic | null = await Statistic.findByIdAndUpdate(
            { _id: id },
            body,
            { new: true }
        );
        const allStatistics: IStatistic[] = await Statistic.find();
        res.status(200).json({
            message: "Member updated",
            statistic: updatedStatistic,
            statistics: allStatistics
        });
    } catch(err) {
        throw err;
    }
};