import { NextFunction, Request, RequestHandler, Response } from "express";
import { Account } from "../models/account.model";
import { Transaction } from "../models/transaction.model";

export const getTransactions: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accounts = await Account.find({user: req.userId});
        const transactions = await Transaction.find({account: {'$in': accounts}}).populate('account');
        res.json(transactions);
    } catch (err) {
        next(new Error('Could not get transactions from database'));
    }
}

export const addTransaction: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const transaction = new Transaction(req.body);
        const transaction_saved = await transaction.save();
        let rebalance = 0;
        if (transaction.type == 'expense') {
            rebalance = -transaction.amount;
        } else if (transaction.type == 'income') {
            rebalance = transaction.amount;
        }
        await Account.updateOne({_id: transaction.account}, {
            "$push": { "transactions": transaction_saved._id},
            "$inc": {"balance": rebalance}
        })
        res.json(transaction_saved);
    } catch (err) {
        next(new Error('Could not add transaction to database'));
    }
}

export const getTransaction: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (transaction) {
            res.json(transaction);
        } else {
            next(new Error('Could not find transaction in database'));
        }
    } catch (err) {
        next(new Error('Could not get transaction from database'));
    }
}

export const updateTransaction: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (transaction) {
            if(req.body.account) {
                let rebalance = 0;
                if (transaction.type == 'expense') {
                    rebalance = -transaction.amount;
                } else if (transaction.type == 'income') {
                    rebalance = transaction.amount;
                }
                await Account.updateOne({_id: transaction.account}, {
                    "$pull": { "transactions": transaction._id },
                    "$inc": { "balance": -rebalance }
                });
                await Account.updateOne({_id: req.body.account}, {
                    "$push": { "transactions": transaction._id },
                    "$inc": { "balance": rebalance }
                });
            }
            if (req.body.amount) {
                let rebalance = 0;
                if (transaction.type == 'expense') {
                    rebalance = transaction.amount - req.body.amount;
                } else if (transaction.type == 'income') {
                    rebalance = -transaction.amount + req.body.amount;
                }
                await Account.updateOne({_id: req.body.account || transaction.account}, {
                    "$push": { "transactions": transaction._id },
                    "$inc": { "balance": rebalance }
                });
            }
            await Transaction.updateOne({_id: req.params.id}, req.body, { runValidators: true });
            const transaction_new = await Transaction.findById(req.params.id);
            res.json(transaction_new);
        } else {
            next(new Error('Could not find transaction in database'));
        }
    } catch (err) {
        next(new Error('Could not update transaction in database'));
    }
}

export const deleteTransaction: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (transaction) {
            let rebalance = 0;
            if (transaction.type == 'expense') {
                rebalance = -transaction.amount;
            } else if (transaction.type == 'income') {
                rebalance = transaction.amount;
            }
            await Account.updateOne({_id: transaction.account}, {
                "$pull": { "transactions": transaction._id },
                "$inc": { "balance": -rebalance }
            });
            await Transaction.deleteOne({ _id: transaction._id });
            res.json({});
        } else {
            next(new Error('Could not find transaction in database'));
        }
    } catch (err) {
        next(new Error('Could not delete transaction from database'));
    }
}