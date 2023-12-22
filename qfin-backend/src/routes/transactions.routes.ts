import { Router } from "express";
import { addAccount, getAccounts } from "../controllers/accounts.controller";
import auth from "../middlewares/auth.middleware";
import { addTransaction, deleteTransaction, getTransaction, getTransactions, updateTransaction } from "../controllers/transactions.controller";

const transactionRouter = Router();
transactionRouter.use(auth);

transactionRouter.get('/', getTransactions);
transactionRouter.post('/', addTransaction);
transactionRouter.get('/:id', getTransaction);
transactionRouter.patch('/:id', updateTransaction);
transactionRouter.delete('/:id', deleteTransaction);

export default transactionRouter;