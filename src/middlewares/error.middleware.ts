import {Request, Response, NextFunction} from "express";

export const errorMiddleware = (err : any, _req : Request, res : Response, _next : NextFunction) => {
    const status = err.status || 500;
    const message = err.message || "Internal server error";

    console.error(`[Error] ${status} - ${message}`);
    res.status(status).jaon({error: {message, status}});
}