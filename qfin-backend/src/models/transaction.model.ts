import mongoose, { Schema, model } from 'mongoose';
import { IAccount } from './account.model';

export interface ITransaction {
    account: IAccount;
    name: string;
    type: string;
    category: string;
    amount: number;
    date: Date,
}

const transactionSchema = new Schema<ITransaction>({
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    name: { type: String },
    type: { type: String, enum: ['income', 'expense'], required: true },
    category: { type: String },
    amount: { type: Number, required: true },
    date: { type: Date, required: true }
}, {
    timestamps: false,
    versionKey: false,
});

export const Transaction = model<ITransaction>('Transaction', transactionSchema);