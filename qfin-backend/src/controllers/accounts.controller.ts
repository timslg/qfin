import { NextFunction, Request, RequestHandler, Response } from "express";
import { Account } from "../models/account.model";
import { User } from "../models/user.model";

export const getAccounts: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accounts = await Account.find({user: req.userId});
        res.json(accounts);
    } catch (err) {
        next(new Error('Could not get accounts from database'));
    }
}

export const addAccount: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const account = new Account({
            name: req.body.name,
            user: req.userId
        });
        const account_saved = await account.save();
        await User.updateOne({_id: account.user}, { "$push": { "expenses": account_saved._id}})
        res.json(account_saved);
    } catch (err) {
        next(new Error('Could not add account to database'));
    }
}