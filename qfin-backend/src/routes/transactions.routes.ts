import { Router } from "express";
import { addAccount, getAccounts } from "../controllers/accounts.controller";
import auth from "../middlewares/auth.middleware";
import { addTransaction, getTransactions } from "../controllers/transactions.controller";

const transactionRouter = Router();
transactionRouter.use(auth);

transactionRouter.get('/', getTransactions);
transactionRouter.post('/', addTransaction);

export default transactionRouter;