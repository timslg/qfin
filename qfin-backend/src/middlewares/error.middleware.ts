import { ErrorRequestHandler, NextFunction, Request, Response } from "express"

const error: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({
        error: err.message
    });
}

export default error