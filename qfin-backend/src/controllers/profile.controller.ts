import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../models/user.model";

export const getProfile: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    User.findById(req.userId).exec().then((user) => {
        res.json(user);
    });
}