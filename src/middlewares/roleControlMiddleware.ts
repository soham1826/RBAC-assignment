import { NextFunction, Request,Response } from "express";

const authorizeRoles = (...roles:string[])=>{
    //Middleware for handling Role authorization
    return (req:Request, res:Response, next:NextFunction)=>{
        
        // if current user's role not present in input args deny the entry
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({
                message: "Access Denied",
            });
            return   
        }
        next();
    }
}

export default authorizeRoles;