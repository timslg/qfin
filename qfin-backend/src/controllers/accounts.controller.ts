import { NextFunction, Request, RequestHandler, Response } from "express";
import { Account } from "../models/account.model";
import { User } from "../models/user.model";
import { Transaction } from "../models/transaction.model";

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
            user: req.userId,
            balance: req.body.balance,
        });
        const account_saved = await account.save();
        await User.updateOne({_id: account.user}, { "$push": { "accounts": account_saved._id}})
        res.json(account_saved);
    } catch (err) {
        next(new Error('Could not add account to database'));
    }
}

export const getAccount: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const account = await Account.findById(req.params.id);
        if (account) {
            res.json(account);
        } else {
            next(new Error('Could not find account in database'));
        }
    } catch (err) {
        next(new Error('Could not get account from database'));
    }
}

export const updateAccount: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let update = req.body;
        delete update.user;
        delete update.transactions;
        await Account.updateOne({_id: req.params.id}, req.body, { runValidators: true });
        const account = await Account.findById(req.params.id);
        if (account) {
            res.json(account);
        } else {
            next(new Error('Could not find account in database'));
        }
    } catch (err) {
        next(new Error('Could not update accounts in database'));
    }
}

export const deleteAccount: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const account = await Account.findById(req.params.id);
        if (account) {
            await Transaction.deleteMany({_id: {$in: account.transactions}});
            await User.updateOne({_id: account.user}, { "$pull": { "accounts": account._id}});
            await Account.deleteOne({_id: account._id});
            res.json({});
        } else {
            next(new Error('Could not find account in database'));
        }
    } catch (err) {
        next(new Error('Could not delete account from database'));
    }
}