import { NextFunction, Request, RequestHandler, Response } from "express"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model";

const token_secret : string = process.env.TOKEN_SECRET || '12345';

const auth: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if(authorization) {
        const token = authorization.split(' ')[1];
        jwt.verify(token, token_secret, (err: any, user: any) => {
            if (err) {
                res.status(401).json({message: err.message});
            }else{
                req.userId = user.id;
                next();
            }
        });
    } else {
        res.status(401).json({message: 'missing auth'});
    }
}

export default auth