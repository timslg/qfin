import mongoose, { Schema, model } from 'mongoose';

interface IUser {
    email: string;
    name: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
});

export const User = model<IUser>('User', userSchema);