import mongoose, { Schema, model } from 'mongoose';
import { IUser } from './user.model';
import { ITransaction } from './transaction.model';

export interface IAccount {
    name: string;
    user: IUser;
    transactions: [ITransaction];
    balance: number;
}

const accountSchema = new Schema<IAccount>({
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, select: false },
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
    balance: { type: Number, default: 0.00 }
}, {
    timestamps: false,
    versionKey: false,
});

export const Account = model<IAccount>('Account', accountSchema);