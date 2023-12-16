import { Router } from "express";
import { User } from "../models/user.model";
import { getProfile } from "../controllers/profile.controller";
import auth from "../middlewares/auth.middleware";

const profileRouter = Router();
profileRouter.use(auth);

profileRouter.get('/', getProfile);

export default profileRouter;