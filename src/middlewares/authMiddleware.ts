import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';
import { Request,Response,NextFunction } from 'express'

// Extending Express's Request interface as it doesn't have "user" property
declare global {
    namespace Express {
        interface Request {
            user?: User | JwtPayload;
        }
    }
}

 //middleware to handle token verifcation
const verifyToken = (req:Request,res:Response,next:NextFunction)=>{
    
    //Extracting token from headers
    const authHeader = req.headers.authorization || req.body.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        const authToken = authHeader?.split(" ")[1];
        
        if(!authToken){
            res.status(401).json("Token not found , Authorization denied")
        }

        //Decoding the token and if success then assigning user to request for next middleware to use for role verification 
        try {
            const decode  = jwt.verify(authToken ,process.env.JWT_SECRET as string ) as JwtPayload
            req.user = decode;
            // console.log(req.user)
            next();
        } catch (error) {   
            console.log(error);
            res.status(401).json({message: "Token is invalid"})
        }
    }else{
        res.status(401).json({
            message:"Token Not found, Authorization Denied"
        })
    }
}


export default verifyToken;