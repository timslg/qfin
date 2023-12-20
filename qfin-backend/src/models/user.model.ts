import mongoose, { Schema, model } from 'mongoose';
import { IAccount } from './account.model';

export interface IUser {
    email: string;
    name: string;
    password: string;
    accounts: [IAccount];
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true, select: false },
    accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }]
}, {
    timestamps: false,
    versionKey: false,
});

export const User = model<IUser>('User', userSchema);