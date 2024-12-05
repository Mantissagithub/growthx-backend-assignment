import jwt, {JwtPayload} from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

const jwt_secret = process.env.JWT_SECRET || "defaultSecret";

export const authMiddleware = (roles : string[] = []) => {
    return (req : Request, res : Response, next : NextFunction) => {
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({message : 'Acess denied : NO token provided'});
        }

        const token = authHeader.split('')[1];

        jwt.verify(token, jwt_secret, (err, decoded : JwtPayload | undefined) => {
            if(err){
                return res.status(403).json({message : 'INvalid or expired Token'});
            }

            req.user = decoded;

            if(roles.length && !roles.includes(decoded.role)){
                return res.status(403).json({message : 'Forbidden : Insufficient permissions'});
            }

            next()
        });
    };
};

