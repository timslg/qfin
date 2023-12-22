import { Account } from "./account";

export interface Transaction {
    _id: string;
    account: Account;
    name: string;
    type: string;
    category: string;
    amount: number;
    date: Date;
}