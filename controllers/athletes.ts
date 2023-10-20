import { Response, Request } from "express";
import { IAthlete } from "../types/athlete";
import Athlete from "../models/athlete";
import mongoose from "mongoose";

export const getAthletes = async(req: Request, res: Response) => {
    try {
        const athletes: IAthlete[] = await Athlete.find();
        res.status(200).json({ athletes });
    } catch(err) {
        console.error(err);
    }
};