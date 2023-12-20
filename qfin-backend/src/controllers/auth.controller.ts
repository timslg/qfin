import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../models/user.model";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const token_secret : string = process.env.TOKEN_SECRET || '12345';

export const signup: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 10)
    });
    user.save().then((user) => {
        res.sendStatus(201);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
    })
}

export const signin: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    User.findOne({email: req.body.email}).select('password').exec().then((user) => {
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const expiresIn = '1800s';
                const token = jwt.sign({id: user.id}, token_secret, {expiresIn})
                res.status(200).json({token, expiresIn});
            } else {
                res.status(400).json({ message: "Password not valid." });
            }
        } else {
            res.status(400).json({ message: "E-Mail not found." });
        }
    }).catch((err) => {
        res.status(400).json({message: 'unknown error occured'});
    });
}