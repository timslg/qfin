import { Router } from "express";
import { addAccount, getAccounts } from "../controllers/accounts.controller";
import auth from "../middlewares/auth.middleware";

const accountsRouter = Router();
accountsRouter.use(auth);

accountsRouter.get('/', getAccounts);
accountsRouter.post('/', addAccount);

export default accountsRouter;