import { Router } from "express";
import { addAccount, deleteAccount, getAccount, getAccounts, updateAccount } from "../controllers/accounts.controller";
import auth from "../middlewares/auth.middleware";

const accountsRouter = Router();
accountsRouter.use(auth);

accountsRouter.get('/', getAccounts);
accountsRouter.post('/', addAccount);
accountsRouter.get('/:id', getAccount);
accountsRouter.patch('/:id', updateAccount);
accountsRouter.delete('/:id', deleteAccount);

export default accountsRouter;