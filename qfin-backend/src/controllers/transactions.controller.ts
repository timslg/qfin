import { NextFunction, Request, RequestHandler, Response } from "express";
import { Account } from "../models/account.model";
import { Transaction } from "../models/transaction.model";

export const getTransactions: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (err) {
        next(new Error('Could not get transactions from database'));
    }
}

export const addTransaction: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const transaction = new Transaction(req.body);
        const transaction_saved = await transaction.save();
        await Account.updateOne({_id: transaction.account}, { "$push": { "transactions": transaction_saved._id}})
        res.json(transaction_saved);
    } catch (err) {
        next(new Error('Could not add transaction to database'));
    }
}