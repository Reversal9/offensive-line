import { Response, Request } from "express";
import { IUser } from "../types/user";
import User from "../models/user";
import mongoose from "mongoose";

export const addUser = async(req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body;
        const user: IUser = new User({
            username: body.username,
            password: body.password,
           
        });
        const newUser: IUser = await user.save();
        const allUser: IUser[] = await User.find();
        res.status(201).json({
            message: "User added",
            user: newUser,
            users: allUser
        });
    } catch(err) {
        throw err;
    }
};

export const authenticateUser = async(req: Request, res: Response): Promise<void> => {
    try {
        
    } catch(err) {
        throw err;
    }
};
