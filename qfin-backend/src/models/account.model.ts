import mongoose, { Schema, model } from 'mongoose';
import { IUser } from './user.model';
import { ITransaction } from './transaction.model';

export interface IAccount {
    name: string;
    user: IUser;
    transactions: [ITransaction];
}

const accountSchema = new Schema<IAccount>({
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, select: false },
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
}, {
    timestamps: false,
    versionKey: false,
});

export const Account = model<IAccount>('Account', accountSchema);