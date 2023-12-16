import { Router } from "express";
import { signin, signup } from "../controllers/auth.controller";
import { User } from "../models/user.model";

const router = Router();

router.post('/sign-up', signup);

router.post('/sign-in', signin);

router.get('/users', async (req, res) => {
    const users = await User.find({});
    res.json(users);
})

export default router;